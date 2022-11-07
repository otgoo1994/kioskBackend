<!-- eslint-disable vue/multi-word-component-names -->
<style lang="scss">
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.main-container {
    display: flex;
    flex-direction: row;
    min-height: 100vh;

    .dashbard-menu-wrap {
        width: 300px;
        box-shadow: 0 5px 5px rgb(0 0 0 / 7%);
        background: #fff;
        z-index: 3;
        overflow: hidden;
        height: 100%;
        position: fixed;
        .user-profile-menu {
            padding: 50px 0px;
        }
        h3 {
            text-align: left;
            padding-left: 50px;
            margin-bottom: 20px;
            font-weight: 600;
            color: #999;
        }

        ul li {
            width: 100%;
            text-align: left;
            padding: 20px 50px;
            border-top: 1px solid #eee;
            cursor: pointer;
            &:hover {
                background: #f7f7f7;
            }
            
            a {
                font-weight: 500;
                i {
                    margin-right: 20px;
                    font-weight: 700;
                }
                span {
                    padding: 5px 8px;
                    font-weight: 700;
                    color: #fff;
                    margin-left: 10px;
                    border-radius: 5px;
                }
            }

            &.active {
              background: #008BCF !important;
              a {
                color: #fff;
                i {
                  color: #fff;
                }
              }
            }
        }

        ul li:last-child {
            border-bottom: 1px solid #eee;
        }
    }

    .content {
        z-index: 1;
        width: 100%;
        padding-left: 351px;
        padding-right: 50px;
        padding-top: 100px;
    } 
}

.main-footer {
    .footer-inner, .sub-footer {
        // padding-left: 351px;
    }
}

table th {
    font-weight: 600;
}
</style>
<template>
    <div class="main-container">
        <div class="dashbard-menu-wrap">
            <div class="dashbard-menu-container">
                <!-- user-profile-menu-->
                <div class="user-profile-menu">
                    <h3>MAIN</h3>
                    <ul class="no-list-style">
                        <li @click="$router.push('/admin/dashboard')"><a href="javascript:;"><i class="fal fa-chart-line"></i>Шинэ зарууд</a></li>
                        <li @click="$router.push('/admin/properties')"><a href="javascript:;"><i class="fal fa-chart-pie"></i>Бүртгэгдсэн зарууд</a></li>
                        <li class="active" @click="$router.push('/admin/members')"><a href="javascript:;"><i class="fal fa-user-edit"></i>Админууд</a></li>
                        <li><a href="javascript:;"><i class="fal fa-envelope"></i>Messages <span>3</span></a></li>
                        <li><a href="javascript:;"><i class="fal fa-users"></i>Агентууд</a></li>
                        <li @click="$router.push('/admin/reports')"><a href="javascript:;"><i class="fal fa-question"></i>Гомдол</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content">
            <div align="right" style="margin-bottom: 20px;">
                <el-button @click="dialog.addEmp = true">Бүртгэх</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <!-- <el-table-column label="Зураг">
                    <template v-slot="scope">
                        <img :src="$appUrl + '/images/employee/' + scope.row.image" alt="" style="width: 30px; height: auto;">
                    </template>
                </el-table-column> -->
                <el-table-column prop="name" label="Нэр" />
                <el-table-column prop="phone" label="Утас" />
                <el-table-column prop="email" label="Имэйл" />
                <el-table-column label="">
                    <template v-slot="scope">
                        <el-popconfirm
                            style="width: 500px"
                            v-if="!scope.row.superuser"
                            confirm-button-text="Тийм"
                            cancel-button-text="Үгүй"
                            :icon="InfoFilled"
                            width="200px"
                            title="Итгэлтэй байна уу?"
                            @confirm="removeMember(scope.row.id)"
                        >
                            <template #reference>
                                <el-button  size="mini" type="warning" plain>
                                    Устгах
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="dialog.addEmp" title="Бүртгэх цонх" width="30%" center>
            <div>
                <el-input v-model="user.name" placeholder="Нэр" size="large" style="margin-bottom: 10px;" clearable/>
                <el-input v-model="user.phone" placeholder="Утасны дугаар" size="large" style="margin-bottom: 10px;" clearable/>
                <el-input v-model="user.email" placeholder="Имэйл" size="large" clearable/>
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialog.addEmp = false">Болих</el-button>
                <el-button type="warning" @click="saveEmployee">Хадгалах</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            adminToken: null,
            dialog: {
                addEmp: false
            },
            user: {
                name: '',
                phone: '',
                email: ''
            }
        }
    },
    mounted() {
        this.adminToken  = localStorage.getItem('edit_to');
        this.getProps();
    },
    methods: {
        getProps() {
            this.$axios({
                method: 'GET',
                url: `/admin/get-employee`,
                headers: { Authorization: `Bearer ${this.adminToken}` },
                data: {}
            }).then(data => {
                if (data.data.status === 200) {
                    this.tableData = data.data.employee;
                }
            });
        },
        removeMember(id) {
            this.$axios({
                method: 'DELETE',
                url: `/admin/remove-employee`,
                headers: { Authorization: `Bearer ${this.adminToken}` },
                data: { id }
            }).then(() => {
                this.$message.success('Амжилттай');    
                this.getProps();
            });
        },
        saveEmployee() {
            if (this.user.name != '' && this.user.phone != '' && this.user.email != '') {
                this.$axios({
                    method: 'POST',
                    url: `/admin/add-employee`,
                    headers: { Authorization: `Bearer ${this.adminToken}` },
                    data: {
                        user: this.user
                    }
                }).then(data => {
                    if (data.data.status === 409) {
                        this.$message.warning('Бүртгэлтэй цахим хаяг');        
                    } else if (data.data.status === 200){
                        this.$message.success('Амжилттай');    
                        this.user = { name: '', phone: '', email: '' };
                        this.getProps();
                    }
                });
            } else {
                this.$message.error('Талбараа бүрэн бөглөнө үү');
            }
        }
    }
}
</script>