<!-- eslint-disable vue/multi-word-component-names -->
<style scoped>
.el-select .el-input .el-select__caret.el-icon{
    margin-top: -10px !important;
}
</style>
<template>
    <div class="content">
        <!--  section  -->
        <!-- <section class="hidden-section single-par2" data-scrollax-parent="true">
            <div class="bg-wrap bg-parallax-wrap-gradien">
                <div class="bg par-elem" data-bg="@/assets/images/bg/1.jpg" data-scrollax="properties: { translateY: '30%' }"></div>
            </div>
            <div class="container">
                <div class="section-title center-align big-title">
                    <h2><span>Listings Without Map</span></h2>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec tincidunt arcu, sit amet fermentum sem.</h4>
                </div>
                <div class="scroll-down-wrap">
                    <div class="mousey">
                        <div class="scroller"></div>
                    </div>
                    <span>Scroll Down To Discover</span>
                </div>
            </div>
        </section> -->
        <section class="parallax-section single-par color-bg">
            <div class="container">
                <div class="section-title center-align big-title" style="min-height: 60px;">
                    <!-- <h2></h2>
                    <h4></h4> -->
                </div>
            </div>
            <div class="pwh_bg"></div>
            <div class="mrb_pin vis_mr mrb_pin3 "></div>
            <div class="mrb_pin vis_mr mrb_pin4 "></div>
        </section>
        <!--  section  end-->
        <!-- col-list-wrap -->
        <section class="gray-bg small-padding ">
            <div class="container">
                <div class="mob-nav-content-btn  color-bg show-list-wrap-search ntm fl-wrap">Хайлт хийх</div>
                <!-- list-searh-input-wrap-->
                <div class="list-searh-input-wrap box_list-searh-input-wrap lws_mobile fl-wrap">
                    <div class="list-searh-input-wrap-title fl-wrap"><i class="far fa-sliders-h"></i><span>Хайлтын утгууд</span></div>
                    <div class="custom-form fl-wrap">
                        <div class="row">
                            <!-- listsearch-input-item -->
                            <div class="col-sm-6">
                                <!-- <div class="listsearch-input-item ">
                                    <input type="text" placeholder="Дэлгэрэнгүй ( Гудамж, Хороолол г.м )" value=""/>
                                </div> -->
                                <label>Дэлгэрэнгүй</label>
                                <el-input v-model="detailText" placeholder="..." clearable size="large" />
                            </div>
                            <!-- listsearch-input-item -->
                            <!-- listsearch-input-item -->
                            <div class="col-sm-3">
                                <label>Ашиглалтын хэлбэр</label>
                                <el-select v-model="usage.current" filterable placeholder="..." size="large" style="width: 100%;" clearable >
                                    <el-option style="text-align: left;"
                                    v-for="item in usage.list"
                                    :key="item.id"
                                    :label="item.usename"
                                    :value="item.id"
                                    />
                                </el-select>
                            </div>
                            <!-- listsearch-input-item -->								
                            <!-- listsearch-input-item -->
                            <div class="col-sm-3">
                                <label>Хот / Аймаг</label>
                                <el-select v-model="cities.current" filterable placeholder="..." size="large" style="width: 100%;" clearable >
                                    <el-option style="text-align: left;"
                                    v-for="item in cities.list"
                                    :key="item.id"
                                    :label="item.cityname"
                                    :value="item.id"
                                    />
                                </el-select>
                            </div>
                            <!-- listsearch-input-item -->
                            <div class="clearfix" style="margin-top: 20px; height: 50px;"></div>
                            <!-- listsearch-input-item -->
                            <div class="col-sm-4">
                                <label>Газрын зориулалт</label>
                                <el-select v-model="intended.current" filterable placeholder="..." size="large" style="width: 100%;" clearable >
                                    <el-option style="text-align: left;"
                                    v-for="item in intended.list"
                                    :key="item.id"
                                    :label="item.intent"
                                    :value="item.id"
                                    />
                                </el-select>
                            </div>
                            <!-- listsearch-input-item -->								
                            <!-- listsearch-input-item -->
                            <div class="col-sm-5">
                                <label>Үнэ</label>        
                                <div class="slider-demo-block" style="margin-top: 0px;">
                                    <el-slider v-model="slider.value" range  :min="slider.min" :max="slider.max" />
                                </div>
                            </div>
                            <!-- listsearch-input-item -->								
                            <!-- listsearch-input-item -->
                            <div class="col-sm-3">
                                <div class="listsearch-input-item">
                                    <a href="javascript:;" @click="getProperties" style="margin-top: 25px;" class="btn color-bg fw-btn float-btn small-btn">Хайх</a>										
                                </div>
                            </div>
                            <!-- listsearch-input-item --> 						
                        </div>
                    </div>
                </div>
                <!-- list-searh-input-wrap end-->							
                <!-- list-main-wrap-header-->
                <div class="list-main-wrap-header box-list-header fl-wrap">
                    <!-- list-main-wrap-title-->
                    <div class="list-main-wrap-title">
                        <h2>Үр дүн : <span> </span>Бүгд<strong>{{properties.normal.length + properties.vip.length + properties.special.length}}</strong></h2>
                    </div>
                    <!-- list-main-wrap-title end-->
                    <!-- list-main-wrap-opt-->
                    <div class="list-main-wrap-opt">
                        <!-- price-opt-->
                        <div class="grid-opt">
                            <ul class="no-list-style">
                                <li class="grid-opt_act"><span class="two-col-grid act-grid-opt tolt" data-microtip-position="bottom" data-tooltip="Grid View"><i class="far fa-th"></i></span></li>
                                <li class="grid-opt_act"><span class="one-col-grid tolt" data-microtip-position="bottom" data-tooltip="List View"><i class="far fa-list"></i></span></li>
                            </ul>
                        </div>
                        <!-- price-opt end-->
                    </div>
                    <!-- list-main-wrap-opt end-->                    
                </div>
                <!-- list-main-wrap-header end-->		
                <!-- listing-item-wrap-->
                <!-- {{properties.normal.length}} -->
                <div class="listing-item-container three-columns-grid  box-list_ic fl-wrap" v-if="properties.normal.length > 0 || properties.vip.length > 0 || properties.special.length > 0">
                    <div class="listing-item" v-for="(item, index) in properties.vip" :key="index">
                        <!-- {{item.imagename}} -->
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
                                            <a href="#" class="cat-opt" style="background: #d94b41;">VIP</a>
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
                                        <router-link to="/agent" class="gcf-company"><img :src="$appUrl + '/images/member/' + item.image" alt=""><span>By {{item.name}}</span></router-link>
                                        <div class="listing-rating card-popup-rainingvis tolt" data-microtip-position="top" data-tooltip="Excellent" data-starrating2="5"></div>
                                    </div> -->
                                </div>
                            </article>
                    </div>
                    <div class="listing-item" v-for="(item, index) in properties.special" :key="index">
                        <!-- {{item.imagename}} -->
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
                                            <a href="#" class="cat-opt blue-bg" v-if="item.special == 2">Онцгой</a>
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
                                        <router-link to="/agent" class="gcf-company"><img :src="$appUrl + '/images/member/' + item.image" alt=""><span>By {{item.name}}</span></router-link>
                                        <div class="listing-rating card-popup-rainingvis tolt" data-microtip-position="top" data-tooltip="Excellent" data-starrating2="5"></div>
                                    </div> -->
                                </div>
                            </article>
                    </div>
                    <div class="listing-item" v-for="(item, index) in properties.normal" :key="index">
                        <!-- {{item.imagename}} -->
                        <article class="geodir-category-listing fl-wrap">
                                <div class="geodir-category-img fl-wrap">
                                    <router-link :to="'/single/' + item.propertyId" class="geodir-category-img_item">
                                        <img :src="$appUrl + '/images/property/' + item.imagename" alt="">
                                        <div class="overlay"></div>
                                    </router-link>
                                    <div class="geodir-category-location" style="width: 100%;">
                                        <a href="#" class="single-map-item tolt" data-newlatitude="40.88496706" data-newlongitude="-73.88191222" data-microtip-position="top-left" data-tooltip="On the map"><i class="fas fa-map-marker-alt"></i> <span>  {{getDistrict(item.district)}}, {{getCityname(item.city)}}</span></a>
                                    </div>
                                    <!-- <ul class="list-single-opt_header_cat">
                                        <li>
                                            <a href="#" class="cat-opt blue-bg" v-if="item.special == 2">Онцгой</a>
                                            <a href="#" class="cat-opt" style="background: #d94b41;" v-else-if="item.special == 3">VIP</a>
                                        </li>
                                    </ul> -->
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
                                        <router-link to="/agent" class="gcf-company"><img :src="$appUrl + '/images/member/' + item.image" alt=""><span>By {{item.name}}</span></router-link>
                                        <div class="listing-rating card-popup-rainingvis tolt" data-microtip-position="top" data-tooltip="Excellent" data-starrating2="5"></div>
                                    </div> -->
                                </div>
                            </article>
                    </div>
                </div>
                <div v-if="properties.vip.length <= 0 && properties.special.length <= 0 && properties.normal.length <= 0" align="center">
                    <span style="font-size: 16px; font-weight: 500;">Үр дүн олдсонгүй</span>
                </div>
                <!-- listing-item-wrap end-->
                <!-- pagination-->
                <!-- <div class="pagination">
                    <a href="#" class="prevposts-link"><i class="fa fa-caret-left"></i></a>
                    <a href="#" >1</a>
                    <a href="#" class="current-page">2</a>
                    <a href="#">3</a>
                    <a href="#" class="nextposts-link"><i class="fa fa-caret-right"></i></a>
                </div> -->
                <!-- pagination end-->						
            </div>
        </section>
        <div class="limit-box fl-wrap"></div>
    </div>
</template>

<script>
export default {
    computed: {},
    data() {
        return {
            slider: {
                value: [0, 10],
                max: 10,
                min: 0
            },
            advancedSearch: false,
            cities : {
                current: null,
                list: []
            },
            intended: {
                current: null,
                list: []
            },
            usage: {
                current: null,
                list: []
            },
            List: [],
            detailText: '',
            properties: {
                normal: [],
                special: [],
                vip: []
            },
            settings: {
                city: [],
                district: []
            }
        }
    },
    created() {
        if(this.$route.query.city != undefined) {
            this.cities.current = Number(this.$route.query.city)
        }

        if(this.$route.query.for != undefined) {
            this.intended.current = Number(this.$route.query.for)
        }

        if(this.$route.query.search) {
            this.detailText = this.$route.query.search;
        }
        
        this.List = JSON.parse(localStorage.getItem('properties'));
        if (this.List) {
            this.setSlideMax();
        }
        this.getSettings();
        this.getCity();
    },
    mounted() {
        this.getProperties();
    },
    methods: {
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
        setSlideMax() {
            this.List.forEach(slide => {
                if(this.slider.max < slide.amount) { this.slider.max = slide.amount;  this.slider.value = [0, slide.amount]}
            }); 
        },
        getProperties(event) {
            let query = {};
            if(this.cities.current) {
                query.city = this.cities.current;
            }

            if(this.intended.current) {
                query.for = this.intended.current;
            }

            if(this.detailText) {
                query.search = this.detailText;
            }
            
            if(event) {
                event.preventDefault();
            }

            this.$router.replace({ query })
            this.$emit('changeLoader', true);
            this.$axios({
				method: 'post',
				url: `/props/get-properties`,
				data: {
                    city: this.cities.current,
                    intent: this.intended.current,
                    usage: this.usage.current,
                    detail: this.detailText
                }
			}).then(data => {
                this.$emit('changeLoader', false);
                console.log(data);
                this.properties.normal = data.data.normal;
                this.properties.special = data.data.special;
                this.properties.vip = data.data.vip;
            });
        },
        getSettings() {
            this.$axios({
				method: 'post',
				url: `/props/get-settings`,
				data: {}
			}).then(data => {
                this.usage.list = data.data.usages;
                this.intended.list = data.data.intents;
            });
        },
        getCity() {
            this.$axios({
				method: 'post',
				url: `/props/get-city`,
				data: {}
			}).then(data => {
                this.cities.list = data.data.city;
                this.settings.city = data.data.city;
                this.settings.district = data.data.district;
                let old = this.cities.current;
                this.cities.current = 0;
                this.cities.current = old;
            });
        }
    }
}
</script>
<style lang="css" scoped>
    .bg.par-elem {
        background-image: url('@/assets/images/bg/1.jpg');
    }
    .custom-form label {
        margin-top: 0px;
    }
</style>