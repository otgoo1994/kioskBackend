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
                        <li @click="$router.push('/admin/members')"><a href="javascript:;"><i class="fal fa-user-edit"></i>Админууд</a></li>
                        <li><a href="javascript:;"><i class="fal fa-envelope"></i>Messages <span>3</span></a></li>
                        <li><a href="javascript:;"><i class="fal fa-users"></i>Агентууд</a></li>
                        <li class="active" @click="$router.push('/admin/reports')"><a href="javascript:;"><i class="fal fa-question"></i>Гомдол</a></li>
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
                <el-table-column label="Төлөв">
                    <template v-slot="scope">
                      <el-tag class="ml-2" :type="scope.row.resolve === 0 ? 'warning' : (scope.row.resolve === 1 ? 'success' : 'danger')">{{scope.row.resolve === 0 ? 'Хүлээгдэж байгаа' : (scope.row.resolve === 1 ? 'Шийдвэрлэгдсэн' : 'Түтгэлзсэн')}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="">
                    <template v-slot="scope">
                        <el-button v-if="scope.row.resolve === 0" size="mini" type="success" @click="getSingleProps(scope.row.propertyId)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="fill: #fff; width: 10px; height: 10px;"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.8-9.2L288 94.6z"/></svg>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="dialog.confirm" title="Warning" width="30%" center>
          <span>
            <el-select v-model="option.value" style="width: 100%;" class="m-2" placeholder="Сонгох" size="large">
              <el-option
                style="text-align: left;"
                v-for="item in option.list"
                :key="item.text + '-option'"
                :label="item.text"
                :value="item.value"
              />
            </el-select>
          </span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialog.confirm = false">Болих</el-button>
              <el-button type="primary" @click="updateReport">
                Хадгалах
              </el-button>
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
            property: null,
            dialog: {
              confirm: false
            },
            selected: '',
            option: {
              list: [{
                  value: 1,
                  text: 'Шийдвэрлэгдсэн'
                },
                {
                  value: 2,
                  text: 'Түтгэлзсэн'
                }],
              value: 1
            }
        }
    },
    mounted() {
        this.adminToken  = localStorage.getItem('edit_to');
        this.getProps();
    },
    methods: {
        updateReport() {
          this.$axios({
            method: 'PUT',
            url: `/admin/update-report`,
            headers: { Authorization: `Bearer ${this.adminToken}` },
            data: {
                propertyId: this.selected,
                resolve: this.option.value
            }
			    }).then(data => {
            if (data.data.status === 200) {
              this.getProps();
            }
          });
        },  
        getSingleProps(item) {
          this.selected = item;
          this.dialog.confirm = true;
        },
        getProps() {
            this.$axios({
                method: 'post',
                url: `/admin/last-properties`,
                headers: { Authorization: `Bearer ${this.adminToken}` },
                data: {
                  approved: 1,
                  report: 1
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