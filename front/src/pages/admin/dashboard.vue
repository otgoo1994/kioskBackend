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
                        <li class="active" @click="$router.push('/admin/dashboard')"><a href="javascript:;"><i class="fal fa-chart-line"></i>Шинэ зарууд</a></li>
                        <li @click="$router.push('/admin/properties')"><a href="javascript:;"><i class="fal fa-chart-pie"></i>Бүртгэгдсэн зарууд</a></li>
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
                        <el-button size="mini" type="primary" @click="getSingleProps(scope.row)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="fill: #fff; width: 10px; height: 10px;"><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
                        </el-button>
                        <el-button size="mini" type="success" @click="approveProperty(scope.row.propertyId)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="fill: #fff; width: 10px; height: 10px;"><path d="M182.6 246.6C170.1 259.1 149.9 259.1 137.4 246.6L57.37 166.6C44.88 154.1 44.88 133.9 57.37 121.4C69.87 108.9 90.13 108.9 102.6 121.4L159.1 178.7L297.4 41.37C309.9 28.88 330.1 28.88 342.6 41.37C355.1 53.87 355.1 74.13 342.6 86.63L182.6 246.6zM182.6 470.6C170.1 483.1 149.9 483.1 137.4 470.6L9.372 342.6C-3.124 330.1-3.124 309.9 9.372 297.4C21.87 284.9 42.13 284.9 54.63 297.4L159.1 402.7L393.4 169.4C405.9 156.9 426.1 156.9 438.6 169.4C451.1 181.9 451.1 202.1 438.6 214.6L182.6 470.6z"/></svg>
                        </el-button>
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
        getSingleProps(property) {
            console.log(property);
            // this.$axios({
			// 	method: 'post',
			// 	url: `/props/single-property`,
			// 	data: {
            //         propertyId: id
            //     }
			// }).then(data => {
            //     if(data.data.result == 200) {
            //         console.log(data);
            //     } else {
            //         console.log('not found');
            //     }
            // });
        },
        getProps() {
            this.$axios({
                method: 'post',
                url: `/admin/last-properties`,
                headers: { Authorization: `Bearer ${this.adminToken}` },
                data: {}
            }).then(data => {
                if (data.data.status === 200) {
                    this.tableData = data.data.props;
                    console.log(data.data.props);
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