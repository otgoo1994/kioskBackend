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
                        <li class="active" @click="$router.push('/admin/properties')"><a href="javascript:;"><i class="fal fa-chart-pie"></i>Бүртгэгдсэн зарууд</a></li>
                        <li @click="$router.push('/admin/members')"><a href="javascript:;"><i class="fal fa-user-edit"></i>Админууд</a></li>
                        <li><a href="javascript:;"><i class="fal fa-envelope"></i>Messages <span>3</span></a></li>
                        <li><a href="javascript:;"><i class="fal fa-users"></i>Агентууд</a></li>
                        <li @click="$router.push('/admin/reports')"><a href="javascript:;"><i class="fal fa-question"></i>Гомдол</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="Зураг">
                    <template v-slot="scope">
                        <img :src="$appUrl + '/images/property/' + scope.row.imagename" alt="" style="width: 50px; height: auto;">
                    </template>
                </el-table-column>
                <el-table-column prop="propertyId" label="Зарын дугаар" />
                <el-table-column prop="price" label="Үнэ (САЯ)" />
                <el-table-column prop="title" label="Тайлбар" />
                <el-table-column prop="name" label="Үүсгэсэн хэрэглэгч" />
                <el-table-column label="">
                    <template v-slot="scope">
                        <el-popconfirm
                          confirm-button-text="Тийм"
                          cancel-button-text="Үгүй"
                          title="Устгахдаа итгэлтэй байна уу?"
                          width="160"
                          @confirm="getSingleProps(scope.row)"
                        >
                          <template #reference>
                            <el-button size="mini" type="danger">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="fill: #fff; width: 10px; height: 10px;"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                            </el-button>
                          </template>
                        </el-popconfirm>
                        <!-- <el-button size="mini" type="success" @click="approveProperty(scope.row.propertyId)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="fill: #fff; width: 10px; height: 10px;"><path d="M182.6 246.6C170.1 259.1 149.9 259.1 137.4 246.6L57.37 166.6C44.88 154.1 44.88 133.9 57.37 121.4C69.87 108.9 90.13 108.9 102.6 121.4L159.1 178.7L297.4 41.37C309.9 28.88 330.1 28.88 342.6 41.37C355.1 53.87 355.1 74.13 342.6 86.63L182.6 246.6zM182.6 470.6C170.1 483.1 149.9 483.1 137.4 470.6L9.372 342.6C-3.124 330.1-3.124 309.9 9.372 297.4C21.87 284.9 42.13 284.9 54.63 297.4L159.1 402.7L393.4 169.4C405.9 156.9 426.1 156.9 438.6 169.4C451.1 181.9 451.1 202.1 438.6 214.6L182.6 470.6z"/></svg>
                        </el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            adminToken: null,
            property: null
        }
    },
    mounted() {
        this.adminToken  = localStorage.getItem('edit_to');
        this.getProps();
    },
    methods: {
        getSingleProps(item) {
          this.$axios({
            method: 'PUT',
            url: `/admin/remove-property`,
            headers: { Authorization: `Bearer ${this.adminToken}` },
            data: {
                propertyId: item.propertyId
            }
			    }).then(data => {
            if (data.data.status === 200) {
              this.tableData.forEach((elm, index) => {
                elm.propertyId === item.propertyId ? this.tableData.splice(index, 1): null;
              });
            }
          });
        },
        getProps() {
            this.$axios({
                method: 'post',
                url: `/admin/last-properties`,
                headers: { Authorization: `Bearer ${this.adminToken}` },
                data: {
                  approved: 1
                }
            }).then(data => {
                if (data.data.status === 200) {
                    this.tableData = data.data.props;
                }
            });
        },
        approveProperty(id) {
            this.$confirm('Итгэлтэй байна уу?', 'Санамж', {
                confirmButtonText: 'Тийм',
                cancelButtonText: 'Үгүй',
                type: 'warning'
            }).then(() => {
                // this.$message({
                //     type: 'success',
                //     message: 'Delete completed'
                // });

                this.$axios({
                    method: 'post',
                    url: `/admin/approve-property`,
                    headers: { Authorization: `Bearer ${this.adminToken}` },
                    data: {
                        propertyId: id
                    }
                }).then(data => {
                    if (data.data.status === 200) {
                        this.getProps();
                    }
                });
            });
        }
    }
}
</script>