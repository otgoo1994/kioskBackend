<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <transition n7ame="fade">
            <div class="loader-wrap" v-if="loader">
                <div class="loader-inner">
                    <svg>
                        <defs>
                            <filter id="goo">
                                <fegaussianblur in="SourceGraphic" stdDeviation="2" result="blur" />
                                <fecolormatrix in="blur"   values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2" result="gooey" />
                                <fecomposite in="SourceGraphic" in2="gooey" operator="atop"/>
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>
        </transition>
        <!-- main -->
        <div id="main" v-bind:class="{'push-main-el': !loader}">
            <!-- header -->
            <header class="main-header" style="z-index: 50;">
                <!--  logo  -->
                <div class="logo-holder"><router-link to="/"><img src="@/assets/images/logo.svg" alt=""></router-link></div>
                <!-- logo end  -->
                <!-- nav-button-wrap--> 
                <div class="nav-button-wrap color-bg nvminit">
                    <div class="nav-button">
                        <router-link to="/add-list" class="color-bg" style="top: -2px; font-weight: 700; color: #fff;"><i class="fal fa-plus fa-lg"></i></router-link>
                    </div>
                </div>
                <!--  add new  btn -->
                <div class="add-list_wrap">
                    <router-link to="/add-list" class="add-list color-bg"><i class="fal fa-plus"></i> <span>Зар оруулах</span></router-link>
                </div>
                <!--  add new  btn end -->
                <!--  login btn -->
                <div class="show-reg-form modal-open" v-if="!user" @click="modals.signIn.show = true"><i class="fas fa-user"></i><span>Нэвтрэх</span></div>
                <!-- <div class="show-reg-form modal-open" v-if="user">
                    <a href="javascript:;" @click="logout"><img :src="require('@/assets/logout.svg')" style="width: auto; height: 20px; border-radius: 0;" alt=""></a>
                </div> -->
                <div class="show-reg-form dasbdord-submenu-open" v-if="user" @click="(modals.userInfo = !modals.userInfo, modals.notify.main = false)"><img :src="$appUrl + '/images/member/' + user.image" alt=""></div>
                <div class="dashboard-submenu" v-bind:class="{'db_submenu_open-init': modals.userInfo}" v-if="user">
                    <div class="dashboard-submenu-title fl-wrap">Сайн уу, <span>{{user.name}}</span></div>
                    <ul>
                        <li @click="$router.push('/profile')"><a href="javascript:;"><i class="fal fa-id-badge"></i>Хувийн мэдээлэл</a></li>
                    </ul>
                    <a href="javascript:;" @click="logout" class="color-bg db_log-out"><i class="far fa-power-off"></i> Гарах</a>
                </div>
                <!-- <div class="show-reg-form modal-open" v-if="user">
                    <a href="#"><span>Сайн уу, {{user.name}}</span></a>
                </div> -->

                <div class="cart-btn  tolt show-header-modal" v-bind:class="{'scwllink': modals.notify.main}" data-microtip-position="bottom" @click="(modals.notify.main = !modals.notify.main, modals.userInfo = false, modals.notify.bell = false)"  data-tooltip="Хадгалсан / Харьцуулах зар">
                    <i class="fal fa-bell"></i>
                    <span class="cart-btn_counter color-bg" style="width: 10px; height: 10px;right:20px;top:20px;" v-if="modals.notify.bell"></span>
                </div>

                <div class="header-modal tabs-act" v-bind:class="{'novis_wishlist': !modals.notify.main, 'vis-wishlist': modals.notify.main}">
                    <ul class="tabs-menu fl-wrap no-list-style">
                        <li @click="modals.notify.tab = false" v-bind:class="{'current' : !modals.notify.tab}"><a href="javascript:;">  Хадгалсан <span>- {{favourite.length}}</span></a></li>
                        <li @click="modals.notify.tab = true" v-bind:class="{'current' : modals.notify.tab}"><a href="javascript:;">  Харьцуулах <span>- {{compare.length}}</span></a></li>
                    </ul>
                    <!--tabs -->                       
                    <div class="tabs-container">
                        <div class="tab">
                            <!--tab -->
                            <div id="tab-wish" class="tab-content" v-bind:class="{ 'first-tab' : !modals.notify.tab }">
                                <!-- header-modal-container--> 
                                <div class="header-modal-container scrollbar-inner fl-wrap" data-simplebar>
                                    <!--widget-posts-->
                                    <div class="widget-posts  fl-wrap">
                                        <ul class="no-list-style" v-if="favourite.length === 0">
                                            <li>
                                                Хадгалсан зар байхгүй
                                            </li>
                                        </ul>
                                        <ul class="no-list-style" v-else>
                                            <li v-for="(item, index) in favourite" :key="'fav' + index">
                                                <div class="widget-posts-img">
                                                    <router-link :to="'/single/' + item.propertyId">
                                                        <img :src="$appUrl + '/images/property/' + item.imagename" alt="">
                                                    </router-link>
                                                </div>
                                                <div class="widget-posts-descr">
                                                    <h4><router-link :to="'/single/' + item.propertyId">{{item.title}}</router-link></h4>
                                                    <div class="geodir-category-location fl-wrap"><a href="javascript:;"><i class="fas fa-map-marker-alt"></i> {{getDistrict(item.district)}}, {{getCityname(item.city)}}</a></div>
                                                    <div class="widget-posts-descr-price"><span>ҮНЭ: </span> ₮ {{item.price}} САЯ</div>
                                                    <div class="clear-wishlist" @click="removeFavProps(item.id)"><i class="fal fa-trash-alt"></i></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- widget-posts end-->
                                </div>
                                <!-- header-modal-container end--> 
                                <div class="header-modal-top fl-wrap" v-if="favourite.length > 0">
                                    <div class="clear_wishlist color-bg" @click="removeFavProps(null)"><i class="fal fa-trash-alt"></i> Бүгдийг арилгах</div>
                                </div>
                            </div>
                            <!--tab end -->
                            <!--tab -->
                            <div class="tab">
                                <div id="tab-compare" class="tab-content" v-bind:class="{ 'first-tab' : modals.notify.tab }">
                                    <!-- header-modal-container--> 
                                    <div class="header-modal-container scrollbar-inner fl-wrap" data-simplebar>
                                        <!--widget-posts-->
                                        <div class="widget-posts  fl-wrap">
                                            <ul class="no-list-style" v-if="compare.length === 0">
                                                <li>
                                                    Харьцуулах зар байхгүй
                                                </li>
                                            </ul>
                                            <ul class="no-list-style" v-else>
                                                <li v-for="(item, index) in compare" :key="'compare' + index">
                                                    <div class="widget-posts-img">
                                                        <router-link :to="'/single/' + item.propertyId">
                                                            <img :src="$appUrl + '/images/property/' + item.imagename" alt="">
                                                        </router-link>  
                                                    </div>
                                                    <div class="widget-posts-descr">
                                                        <h4><router-link :to="'/single/' + item.propertyId">{{item.title}}</router-link></h4>
                                                        <div class="geodir-category-location fl-wrap"><a href="javascript:;"><i class="fas fa-map-marker-alt"></i> {{getDistrict(item.district)}}, {{getCityname(item.city)}}</a></div>
                                                        <div class="widget-posts-descr-price"><span>ҮНЭ: </span> ₮ {{item.price}} САЯ</div>
                                                        <div class="clear-wishlist" @click="removeCompareProps(item.propertyId)"><i class="fal fa-trash-alt"></i></div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- widget-posts end-->
                                    </div>
                                    <!-- header-modal-container end--> 										
                                    <div class="header-modal-top fl-wrap" v-if="compare.length > 0">
                                        <router-link class="clear_wishlist color-bg" to="/compare"><i class="fal fa-random"></i> Харьцуулах</router-link>
                                    </div>
                                </div>
                            </div>
                            <!--tab end -->
                        </div>
                        <!--tabs end -->							
                    </div>
                </div>

            </header>
            <div id="wrapper">
                <router-view v-on:changeLoader="loaderStatus($event)" v-on:removeCompare="removeCompareProps($event)" v-on:addFavProps="addFavProps($event)" v-on:addCompare="addCompare($event)"/>
                <Footer/>
                <ScrollTop/>
            </div>


            <div class="main-register-wrap modal" v-bind:class="{'show-modal-signin': modals.signIn.show}">
                <div class="reg-overlay"></div>
                <div class="main-register-holder tabs-act">
                    <div class="main-register-wrapper modal_main fl-wrap vis_mr">
                        <div class="main-register-header color-bg">
                            <div class="main-register-logo fl-wrap">
                                <img src="@/assets/images/logo-light.svg" alt="">
                            </div>
                            <div class="main-register-bg">
                                <div class="mrb_pin"></div>
                                <div class="mrb_pin mrb_pin2"></div>
                            </div>
                            <div class="mrb_dec"></div>
                            <div class="mrb_dec mrb_dec2"></div>
                        </div>
                        <div class="main-register">
                            <div class="close-reg" @click="modals.signIn.show = false"><i class="fal fa-times"></i></div>
                            <ul class="tabs-menu fl-wrap no-list-style">
                                <li v-bind:class="{'current': modals.signIn.tabs}"><a @click="modals.signIn.tabs = true"><i class="fal fa-sign-in-alt"></i> Нэвтрэх</a></li>
                                <li v-bind:class="{'current': !modals.signIn.tabs}"><a @click="modals.signIn.tabs = false"><i class="fal fa-user-plus"></i> Бүртгүүлэх</a></li>
                            </ul>
                            <!--tabs -->                       
                            <div class="tabs-container">
                                <div class="tab" style="margin-bottom: 50px;">
                                    <!--tab -->
                                    <div id="tab-1" class="tab-content first-tab" v-if="modals.signIn.tabs && !modals.confirm">
                                        <div class="custom-form">
                                            <form name="registerform" class="registerform" @submit="Login">
                                                <label>Утасны дугаар<span class="dec-icon"><i class="fal fa-phone"></i></span></label>
                                                <input name="phone" type="text"  placeholder=" '-' гүй оруулна уу" onkeypress='return /^[0-9]$/.test(event.key)' maxlength="8" v-model="login.phone" required pattern="[0-9]{8}" oninvalid="this.setCustomValidity('Утасны дугаараа оруулна уу')" oninput="this.setCustomValidity('')"  class="phone form-inputs">
                                                <!-- ^((\+){0,1}\d{3}(\-){0,1}){0,1}(\d{8})$ -->
                                                <div class="pass-input-wrap fl-wrap">
                                                    <label >Нууц үг  <span class="dec-icon"><i class="fal fa-key"></i></span></label>
                                                    <input name="password" class="form-inputs" placeholder="***" ref="loginPass" type="password"  autocomplete="off" v-model="login.password" required oninvalid="this.setCustomValidity('Нууц үгээ оруулна уу')" oninput="this.setCustomValidity('')" >
                                                    <span class="eye" @click="showPassword('loginPass')"><i v-bind:class="{'fal fa-eye': !password, 'fal fa-eye-slash': password}"></i> </span>
                                                </div>
                                                <div class="lost_password">
                                                    <a href="javascript:;" @click="forgotPassword">Нууц үгээ мартсан уу?</a>
                                                </div>
                                                <div class="clearfix"></div>
                                                <button type="submit" class="log_btn color-bg" style="width: 100%;"> Нэвтрэх </button>
                                            </form>
                                        </div>
                                    </div>
                                    <!--tab end -->
                                    <!--tab -->
                                    <div class="tab">
                                        <div id="tab-2" class="tab-content first-tab" v-if="!modals.signIn.tabs && !modals.confirm">
                                            <div class="custom-form">
                                                <form @submit="registerMember" name="registerform" class="main-register-form" id="main-register-form2">
                                                    <label >Таны нэр * <span class="dec-icon"><i class="fal fa-user"></i></span></label>
                                                    <input name="name" type="text" placeholder="..." v-model="register.name" class="form-inputs">
                                                    <label>Утасны дугаар * <span class="dec-icon"><i class="fal fa-phone"></i></span></label>
                                                    <input name="email" type="text"  placeholder="..."   v-model="register.phone" class="form-inputs">
                                                    <div class="pass-input-wrap fl-wrap">
                                                        <label >Нууц үг * <span class="dec-icon"><i class="fal fa-key"></i></span></label>
                                                        <input name="password" type="password" placeholder="***"  autocomplete="off"  v-model="register.password">
                                                        <span class="eye"><i class="fal fa-eye"></i> </span>
                                                    </div>
                                                    <div class="filter-tags ft-list">
                                                        <label for="check-a2"> Бүртгэл үүсгэснээр та манай <a href="#">үйлчилгээний нөхцөл</a> -ийг зөвшөөрч буй болно.</label>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <button type="submit" class="log_btn color-bg" style="width: 100%;"> Бүртгүүлэх </button>
                                                </form>
                                            </div>
                                        </div>

                                        <div id="tab-3" class="tab-content first-tab" v-if="modals.confirm">
                                            <div class="custom-form">
                                                <p style="text-align: center;">{{register.phone}}-руу илгээсэн<br>баталгаажуулах кодыг оруулна уу.</p>
                                                <input name="name" type="text" placeholder="" v-model="verify.current" class="form-inputs" style="padding: 15px; font-size: 30px; text-align: center;" maxlength="6">
                                                <button type="button" @click="CheckVerifyCode" class="log_btn color-bg" style="width: 100%;"> Баталгаажуулах </button>
                                            </div>
                                        </div>
                                    </div>
                                    <!--tab end -->
                                </div>
                                <!--tabs end -->
                                <!-- <div class="log-separator fl-wrap"><span>or</span></div>
                                <div class="soc-log fl-wrap">
                                    <a href="#" class="facebook-log"> Facebook</a>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- main end -->
    </div>
</template>

<style scoped>
.fl-wrap.no-list-style {
    cursor: pointer;
}
.push-main-el {
    opacity: 1 !important;
}

.show-modal-signin {
    display: block;
}
/* .registerform .phone-country {
    width: 39.9%;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.registerform .phone {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
    text-align: left;
    padding-left: 10px;
    width: 60%;
} */
</style>

<script>
import Footer from '../layout/footer.vue'
import ScrollTop from '../components/scrolltop.vue'
// import { ElNotification } from 'element-plus'
export default {
    components: {
        Footer,
        ScrollTop,
        // ElNotification
    },
    data() {
        return {
            niceSelect: false,
            loader: true,
            login: {
                phone: '',
                password: ''
            },
            register: {
                phone: '',
                name: '',
                password: ''
            },
            modals: {
                signIn: {
                    show: false,
                    tabs: true
                },
                userInfo: false,
                confirm: false,
                notify: {
                    main: false,
                    tab: false,
                    bell: false
                }
            },
            password: false,
            user: null,
            verify: {
                generated: '',
                current: ''
            },
            compare: [],
            favourite: [],
            city: [],
            district: []
        }
    },
    mounted() {
        this.ContentReady();
    },
    beforeRouteUpdate() {
        window.scroll(0, 0)
    },
    methods: {
        removeCompareProps(props) {
            this.compare.forEach((elm, index) => {
                elm.propertyId === props ? this.compare.splice(index, 1) : null;
            });
            localStorage.setItem('compare', JSON.stringify(this.compare));
        },
        getCompareProps() {
            const compare = JSON.parse(localStorage.getItem('compare'));
            if (!compare) {
                return;
            }

            this.compare = compare;
        },
        removeFavProps(id) {
            this.$axios({
                method: 'DELETE',
                url: `/props/remove-fav-props`,
                data: { id }
            }).then(data => {
                if (data.data.status === 200) {
                    this.getFavProps();
                }
            });
        },
        addCompare(item) {
            const obj = {
                city:           item.city,
                district:       item.district,
                discount:       item.discount,
                imagename:      item.imagename,
                price:          item.price,
                propertyId:     item.propertyId,
                title:          item.title,
                special:        item.special,
                created_at:     item.created_at,
                types:          item.types,
                usage:          item.usage,
                lizing:         item.lizing,
                intent:         item.intent,
                sizes:          item.sizes
            }
            let list = [];
            const compare = JSON.parse(localStorage.getItem('compare'));
            if (!compare) {
                list.push(obj);
                localStorage.setItem('compare', JSON.stringify(list));
                return;
            }

            if (compare.length > 3) {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: '4-өөс их бүтээгдэхүүн харьцуулах боломжгүй',
                    type: 'warning',
                });
                return;
            }

            list = compare; let existed = false;
            list.forEach(elm => {
                elm.propertyId === obj.propertyId ? existed = true : null;
            });

            if (!existed) {
                list.push(obj);
            }

            localStorage.setItem('compare', JSON.stringify(list));
            this.compare = list;
            this.modals.notify.bell = true;
            return;
        },
        forgotPassword() {
            this.$prompt('Утасны дугаараа оруулна уу', 'Нууц үг сэргээх', {
                confirmButtonText: 'Сэргээх',
                cancelButtonText: 'Болих',
                inputPattern: /\d{8}/,
                inputErrorMessage: 'Утасны дугаараа оруулна уу'
            }).then(({ value }) => {
                this.$axios({
                    method: 'post',
                    url: `/user/forgot-password`,
                    headers: {},
                    data: { phone: value }
                }).then(data => {
                    if (data.data.status === 200) {
                        this.$notify({
                            title: 'Амжилттай',
                            message: 'Нууц үг шинэчлэгдлээ',
                            type: 'success',
                        });
                    } else if (data.data.status === 401) {
                        this.$notify({
                            title: 'Амжилтгүй',
                            message: 'Бүртгэлгүй утасны дугаар',
                            type: 'error',
                        });
                    }
                });
            })
        },
        CheckVerifyCode() {
            this.$axios({
				method: 'post',
				url: `/user/verify-number`,
				headers: {},
                data: {
                    verify: this.verify,
                    phone: this.register.phone
                }
			}).then(data => {
                if (data.data.status === 200) {
                    this.$notify({
                        title: 'Амжилттай',
                        message: 'Баталгаажлаа',
                        type: 'success',
                    });
                    this.modals.signIn.tabs = true;
                    this.modals.confirm = false;
                } else {
                    this.$notify({
                        title: 'Амжилтгүй',
                        message: 'Баталгаажуулах код буруу',
                        type: 'warning',
                    })
                }
            });
        },
        registerMember(event) {
            event.preventDefault();
            this.$axios({
				method: 'post',
				url: `/user/register`,
				headers: {},
                data: {
                    register: this.register
                }
			}).then(data => {
                if (data.data.status === 409) {
                    this.$notify({
                        title: 'Амжилтгүй',
                        message: 'Бүртгэлтэй хэрэглэгч',
                        type: 'warning',
                    })
                } else if (data.data.status === 200) {
                    this.verify.generated = data.data.code;
                    this.modals.confirm = true;
                } else {
                    console.log(data.data.status);
                }
            });
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.user = null;
            this.$notify({
                title: 'Амжилттай',
                message: 'Системээс гарлаа',
                type: 'warning',
            })
            this.modals.userInfo = false;
            this.favourite = [];
            this.$router.push('/');
        },
        loaderStatus(value) {
            // document.getElementById('main').classList.remove('push-main-el');
            this.loader = value;
        },
        getFavProps() {
            if (this.user) {
                this.$axios({
                    method: 'GET',
                    url: `/props/get-fav-props`
                }).then(data => {
                    if (data.data.status === 200) {
                        this.favourite = data.data.props;
                    }
                });
            }
        },
        addFavProps(props) {
            if (!this.user) {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: 'Нэвтэрсэн байх шаардлагатай',
                    type: 'warning',
                })
                return;
            }


            this.$axios({
				method: 'post',
				url: `/props/add-fav-props`,
				data: {
                    key: {
                        propertyId: props
                    }
                }
			}).then(data => {
                if (data.data.status === 200) {
                    this.$notify({
                        title: 'Амжилттай',
                        message: 'Хадгалагдлаа',
                        type: 'success',
                    });
                    this.modals.notify.bell = true;
                    this.getFavProps();
                } else if (data.data.status === 600) {
                    this.$notify({
                        title: 'Амжилтгүй',
                        message: '5-аас их зар хадгалах боломжгүй',
                        type: 'warning',
                    });
                }
            });
        },
        showPassword(ref) {
            if(this.$refs[ref].type == 'password') {
                this.$refs[ref].type = 'text';
                this.$refs[ref].style.marginBottom = '20px';
            } else {
                this.$refs[ref].type = 'password';
            }
            this.password = !this.password;
        },
        getCityname(id) {
            var city;
            this.city.forEach(element => {
                if (element.id === id ) {
                    city =  element.cityname;
                }
            });
            return city;
        },
        getDistrict(id) {
            var district;
            this.district.forEach(element => {
                if (element.id === id ) {
                    district =  element.district;
                }
            });
            return district;
        },
        ContentReady() {
            this.loader = false;
            this.user = JSON.parse(localStorage.getItem('user'));
            this.getCity();
            this.getFavProps();
            this.getCompareProps();
        },
        async getToken() {
            let token = '';
            this.$axios({
				method: 'post',
				url: `https://sms.unipay.mn/ws/token/get`,
				headers: {},
                data: {
                    username: 'gazarmn',
                    password: 'e!588CJ@R8]c=)K('
                }
			}).then(data => {
                token = data.access_token;
            });
            return token;
        },
        getCity() {
            // this.$emit('changeLoader', true);
            this.$axios({
				method: 'post',
				url: `/props/get-city`,
				data: {}
			}).then(data => {
                this.city = data.data.city;
                this.district = data.data.district;

            });
        },
        async Login(e) {
            e.preventDefault();

            this.$axios({
				method: 'post',
				url: `/user/login`,
				data: {
					phone: this.login.phone,
					password: this.login.password
				}
			}).then(data => {
                if(data.data.status == 200) {
                    localStorage.token = data.data.token;
                    localStorage.user = JSON.stringify(data.data.user);
                    this.user = data.data.user;
                    this.modals.signIn.show = false;
                    this.$notify({
                        title: 'Амжилттай',
                        message: 'Системд нэвтэрлээ',
                        type: 'success',
                    })

                    this.getFavProps();
                } else {
                    this.$notify({
                        title: 'Амжилтгүй',
                        message: 'Утас эсвэл нууц үг буруу',
                        type: 'error',
                    })
                }
            });
        }
    },
}
</script>