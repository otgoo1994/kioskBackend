<!-- eslint-disable vue/multi-word-component-names -->
<style lang="scss" scoped>
.hero-section {
    .kVisual {
        position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);

        .scroll-down-wrap {
            bottom: -80px;
            @media (max-width: 800px) {
                display: none;
            }
        }
    }

    @media (max-width: 800px) {
        height: 300px;
    }
}
</style>
<template>
    <div class="content">
        <!--  section  -->
        <section class="hero-section hero-section_dec" data-scrollax-parent="true">
            <div class="bg-wrap">
                <div class="bg par-elem " data-bg="@/assets/images/bg/1.jpg" data-scrollax="properties: { translateY: '30%' }"></div>
            </div>
            <div class="overlay"></div>
            <div class="container kVisual" align="center">
                <div class="main-search-input-wrap">
                    <div class="main-search-input fl-wrap">
                        <div class="main-search-input-item">
                            <input type="text" placeholder="Та юу хайж байна?" v-model="searchOn"/>
                        </div>
                        <div class="main-search-input-item" @click="niSelectChanged" style="font-family: 'Montserrat', sans-serif;">
                            <div class="nice-select chosen-select" v-bind:class="{'open': niceSelect}" tabindex="0">
                                <span class="current">{{getName}}</span>
                                <div class="nice-select-search-box">
                                    <input type="text" class="nice-select-search" v-model="search" placeholder="Хайх...">
                                </div>
                                <ul class="list">
                                    <li data-value="New York" class="option" @click="choseCity(item.id)" style="" v-for="(item, index) in searchCity" :key="index" v-bind:class="{'selected focus': item.id == cities.current}">{{item.cityname}}</li>
                                </ul>
                            </div>
                        </div>
                        <button class="main-search-button color-bg" @click="goList">  Хайх <i class="far fa-search"></i> </button>
                    </div>
                </div>
                <div class="scroll-down-wrap">
                    <div class="mousey">
                        <div class="scroller"></div>
                    </div>
                    <span>Scroll Down To Discover</span>
                </div>
            </div>
        </section>
        <!--  section  end-->
        <!-- section -->
        <section class="gray-bg small-padding">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="section-title fl-wrap">
                            <!-- <h4>Browse Hot Offers</h4> -->
                            <h2>Сүүлийн зарууд</h2>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="listing-filters gallery-filters">
                            <a href="javascript:;" @click="tabs.selected = 0" class="gallery-filter" v-bind:class="{'gallery-filter-active': tabs.selected == 0}"> <span>Бүгд</span></a>
                            <a href="javascript:;" @click="tabs.selected = 1" class="gallery-filter" v-bind:class="{'gallery-filter-active': tabs.selected == 1}"> <span>Эзэмших</span></a>
                            <a href="javascript:;" @click="tabs.selected = 2" class="gallery-filter" v-bind:class="{'gallery-filter-active': tabs.selected == 2}"> <span>Өмчлөх</span></a>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
                <!-- grid-item-holder-->	
                <div class="grid-item-holder gallery-items gisp fl-wrap">
                    <!-- gallery-item-->
                    <div class="gallery-item for_sale" v-for="( item, index ) in filterProperties" :key="index">
                        <!-- listing-item -->
                        <div class="listing-item">
                            <article class="geodir-category-listing fl-wrap">
                                <div class="geodir-category-img fl-wrap">
                                    <router-link :to="'/single/' + item.propertyId" class="geodir-category-img_item">
                                        <img :src="$appUrl + '/images/property/' + item.imagename" alt="">
                                        <div class="overlay"></div>
                                    </router-link>
                                    <div class="geodir-category-location" style="width: 100%;">
                                        <a href="#" class="single-map-item tolt" data-newlatitude="40.88496706" data-newlongitude="-73.88191222" data-microtip-position="top-left" data-tooltip="On the map"><i class="fas fa-map-marker-alt"></i> <span>  {{getDistrict(item.district)}}, {{getCityname(item.city)}}</span></a>
                                    </div>
                                    <ul class="list-single-opt_header_cat">
                                        <li>
                                            <!-- <a href="#" class="cat-opt blue-bg" v-if="item.special == 1">Энгийн</a> -->
                                            <a href="#" class="cat-opt blue-bg" v-if="item.special == 2">Онцгой</a>
                                            <a href="#" class="cat-opt" style="background: #d94b41;" v-else-if="item.special == 3">VIP</a>
                                        </li>
                                    </ul>
                                    <a href="javascript:;" @click="this.$emit('addFavProps', item.propertyId)" class="geodir_save-btn tolt" data-microtip-position="left" data-tooltip="Хадгалах"><span><i class="fal fa-heart"></i></span></a>
                                    <a href="javascript:;" class="compare-btn tolt" data-microtip-position="left" @click="this.$emit('addCompare', item)" data-tooltip="Харьцуулах"><span><i class="fal fa-random"></i></span></a>
                                    <div class="geodir-category-listing_media-list">
                                        <span><i class="fas fa-camera"></i> {{item.totalImage}}</span>
                                    </div>
                                </div>
                                <div class="geodir-category-content fl-wrap">
                                    <h3 class="title-sin_item">
                                        <router-link :to="'/single/' + item.propertyId">{{item.title}}</router-link></h3>
                                    <div class="geodir-category-content_price">₮ {{calcPrice(item.price)}}</div>
                                    <p class="desc-tag">{{item.description}}</p>
                                    <!-- <div class="geodir-category-content-details">
                                        <ul>
                                            <li><i class="fal fa-bed"></i><span>4</span></li>
                                            <li><i class="fal fa-bath"></i><span>2</span></li>
                                            <li><i class="fal fa-cube"></i><span>460 ft2</span></li>
                                        </ul>
                                    </div> -->
                                    <!-- <div class="geodir-category-footer fl-wrap">
                                        <router-link :to="'/agent/' + encodeToBase64(item.email)" class="gcf-company"><img :src="$appUrl + '/images/member/' + item.image" alt=""><span>By {{item.name}}</span></router-link>
                                        <div class="listing-rating card-popup-rainingvis tolt" data-microtip-position="top" data-tooltip="Excellent" data-starrating2="5"></div>
                                    </div> -->
                                </div>
                            </article>
                        </div>
                        <!-- listing-item end-->															
                    </div>
                    <!-- gallery-item end-->																
                </div>
                <!-- grid-item-holder-->	
                <router-link to="/list" class="btn float-btn small-btn color-bg">Бүх жагсаалтыг харах</router-link>
            </div>
        </section>
        <!-- section end-->
    </div>
</template>
<script>
export default {
    data() {
        return {
            settings: {
                city: [],
                district: []
            },
            cities: {
                current: 0,
                list: []
            },
            niceSelect: false,
            tabs: {
                selected: ''
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                500: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            },
            properties: [],
            search: '',
            searchOn: ''
        }
    },
    beforeRouteUpdate(to, from) {
        if(to.query.login) {
            this.$notify({
                title: 'Амжилтгүй',
                message: 'Нэвтэрсэн байх шаардлагатай',
                type: 'warning',
            })
        }
    },
    computed: {
        getName() {
            let name;
            this.cities.list.forEach(el => {
                if(el.id === this.cities.current) {
                    name = el.cityname
                }
            });
            return name;
        },
        searchCity() {
            var c = [];
            this.cities.list.forEach(el => {
                if(el.cityname.toUpperCase().includes(this.search.toUpperCase())) {
                    c.push(el);
                }
            });
            return c;
        },
        filterProperties() {
            if(this.tabs.selected == 0) {
                return this.properties;
            }

            let filter = [];
            this.properties.forEach(eleme => {
                if(eleme.usage == this.tabs.selected) {
                    filter.push(eleme);
                }
            });
            return filter;
        }

    },
    methods: {
        encodeToBase64(val) {
            return btoa(val);
        },
        calcPrice(price) {
            if(price < 1000) {
                return price + ' сая';
            } else {
                if(price % 1000 === 0) {
                    return price / 1000 + ' тэрбум'
                } else {
                    return parseInt(1999 / 1000) + ' тэрбум ' + price % 1000 + ' сая';
                }
            }
        },
        getCityname(id) {
            var city;
            this.settings.city.forEach(element => {
                if (element.id === id ) {
                    city =  element.cityname;
                }
            });
            return city;
        },
        getDistrict(id) {
            var district;
            this.settings.district.forEach(element => {
                if (element.id === id ) {
                    district =  element.district;
                }
            });
            return district;
        },
        lastProperties() {
            this.$axios({
				method: 'post',
				url: `/props/last-properties`,
				data: {}
			}).then(data => {
               this.properties = data.data.properties;
               this.properties.sort(function(a,b) {
                    return b.special - a.special;
                });
            });
        },
        niSelectChanged(e) {
            if(e.target.classList.contains('nice-select-search')) {
                return
            }

            this.niceSelect = !this.niceSelect;
        },
        choseCity(city) {
            this.cities.current = city;
        },
        goList() {
            if(this.searchOn == '') {
                if(this.cities.current > 0) { this.$router.push({ path: 'list', query: { city: this.cities.current }}); } else { this.$router.push('/list');}
            } else {
                if(this.cities.current > 0) { this.$router.push({ path: 'list', query: { city: this.cities.current, search: this.searchOn }}); } else { this.$router.push({ path: 'list', query: { search: this.searchOn }});}
            }
        },
        getCity() {
            // this.$emit('changeLoader', true);
            this.$axios({
				method: 'post',
				url: `/props/get-city`,
				data: {}
			}).then(data => {
                this.settings.city = data.data.city;
                this.settings.district = data.data.district;
                this.cities.list = data.data.city;
                this.cities.list = [{id: 0, cityname: 'Бүгд'}].concat(this.cities.list);

            });
        },
    },
    mounted() {
        if(this.$route.query.login) {
            this.$notify({
                title: 'Амжилтгүй',
                message: 'Нэвтэрсэн байх шаардлагатай',
                type: 'warning',
            })
        }
        this.getCity();
        this.lastProperties();
    },
};
</script>
<style scoped>
@media only screen and (max-width: 1024px) {
    .lc-wbtn {
        display: none;
    }
}

.bg.par-elem {
    background-image: url('@/assets/images/bg/1.jpg');
}
.single-map-item {
    width: 70%;
    text-align: left;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}
</style>