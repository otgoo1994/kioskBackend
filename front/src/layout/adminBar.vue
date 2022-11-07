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
                <div class="show-reg-form dasbdord-submenu-open" v-if="user" @click="modals.userInfo = !modals.userInfo"><img :src="$appUrl + '/images/employee/' + user.image" alt=""></div>
                <div class="dashboard-submenu" style="right: 10px;" v-bind:class="{'db_submenu_open-init': modals.userInfo}" v-if="user">
                    <div class="dashboard-submenu-title fl-wrap">Сайн уу, <span>{{user.name}}</span></div>
                    <a href="javascript:;" @click="logout" class="color-bg db_log-out"><i class="far fa-power-off"></i> Гарах</a>
                </div>
                <div class="show-reg-form modal-open" v-if="user">
                    <a href="#"><span>Сайн уу, {{user.name}}</span></a>
                </div>

            </header>
            <div id="wrapper">
                <router-view v-on:changeLoader="loaderStatus($event)"/>
                <Footer/>
                <ScrollTop/>
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
            modals: {
                signIn: {
                    show: false,
                    tabs: true
                },
                headerSearch: false,
                moMenu: false,
                userInfo: false,
                confirm: false
            },
            user: null,
        }
    },
    mounted() {
        this.ContentReady();
    },
    beforeRouteUpdate() {
        window.scroll(0, 0)
    },
    methods: {
        logout() {
            localStorage.removeItem('admin');
            localStorage.removeItem('edit_to');
            this.user = null;
            this.$notify({
                title: 'Амжилттай',
                message: 'Системээс гарлаа',
                type: 'warning',
            })
            this.modals.userInfo = false;
            this.$router.push('/admin/login');
        },
        loaderStatus(value) {
            // document.getElementById('main').classList.remove('push-main-el');
            this.loader = value;
        },
        ContentReady() {
            this.loader = false;
            this.user = JSON.parse(localStorage.getItem('admin'));
        },
    },
}
</script>