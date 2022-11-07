<template>
<div class="content">
    <!-- col-list-wrap -->
    <section class="gray-bg small-padding ">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="card-info smpar fl-wrap">
                        <div class="bg-wrap bg-parallax-wrap-gradien">
                            <div class="bg"  data-bg="@/assets/images/bg/1.jpg"></div>
                        </div>
                        <div class="card-info-media">
                            <div class="bg"  :data-bg="$appUrl + '/images/member/' + user.image" :style="{'background-image': 'url(' + $appUrl + '/images/member/' + user.image + ')'}"></div>
                        </div>
                        <div class="card-info-content">
                            <div class="agent_card-title fl-wrap">
                                <h4> {{user.name}} </h4>
                                <div class="geodir-category-location fl-wrap">
                                    <!-- <h5><a href="javascript:;">{{user.phone}}</a></h5> -->
                                    <!-- <div class="listing-rating card-popup-rainingvis" data-starrating2="4"><span class="re_stars-title">Good</span></div> -->
                                </div>
                            </div>
                            <div class="list-single-stats">
                                <ul class="no-list-style">
                                    <li><span class="viewed-counter"><i class="fas fa-eye"></i> Үзсэн -  {{user.viewed}} </span></li>
                                    <!-- <li><span class="bookmark-counter"><i class="fas fa-comment-alt"></i> Reviews -  4 </span></li> -->
                                    <li><span class="bookmark-counter"><i class="fas fa-sitemap"></i> Зар -  {{props.length}} </span></li>
                                </ul>
                            </div>
                            <div class="card-verified tolt" data-microtip-position="left" data-tooltip="Баталгаажсан"><i class="fal fa-user-check"></i></div>
                        </div>
                    </div>
                </div>
                <!-- col-md 8 end -->
                <!--  sidebar-->
                <div class="col-md-4">
                    <!--box-widget-->
                    <div class="box-widget bwt-first fl-wrap">
                        <div class="box-widget-title fl-wrap box-widget-title-color color-bg no-top-margin">Хувийн мэдээлэл</div>
                        <div class="box-widget-content fl-wrap">
                            <div class="contats-list clm fl-wrap">
                                <ul class="no-list-style">
                                    <li><span><i class="fal fa-phone"></i> Утас :</span> <a href="#">+(976) - {{user.phone}}</a></li>
                                    <li><span><i class="fal fa-envelope"></i> Имэйл :</span> <a href="#">{{email}}</a></li>
                                    <li><span><i class="fal fa-map-marker"></i> Хаяг :</span> <a href="#"> - </a></li>
                                    <li><span><i class="fal fa-browser"></i> Вэбсайт :</span> <a href="#">www.gazar.mn</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--box-widget end -->               									
                </div>
                <!--   sidebar end-->			

                <div class="col-md-12">
                    <div class="content-tabs-wrap tabs-act fl-wrap">
                        <div class="content-tabs fl-wrap">
                            <ul class="tabs-menu fl-wrap no-list-style">
                                <li class="current"><a href="javascript:;">  Үүсгэсэн зарууд  </a></li>
                            </ul>
                        </div>                
                        <div class="tabs-container">
                            <div class="tab">
                                <div id="tab-listing" class="tab-content first-tab">
                                    <div class="listing-item-container one-column-grid-wrap  box-list_ic fl-wrap">
                                        <div class="listing-item" v-for="( item, index ) in currentSlide" :key="index">
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
                                                            <a href="#" class="cat-opt" style="background: #d94b41;" v-else-if="item.special == 3">VIP</a>
                                                        </li>
                                                    </ul>
                                                    <a href="#" class="geodir_save-btn tolt" data-microtip-position="left" data-tooltip="Save"><span><i class="fal fa-heart"></i></span></a>
                                                    <a href="#" class="compare-btn tolt" data-microtip-position="left" data-tooltip="Compare"><span><i class="fal fa-random"></i></span></a>
                                                    <div class="geodir-category-listing_media-list">
                                                        <span><i class="fas fa-camera"></i> {{item.totalImage}}</span>
                                                    </div>
                                                </div>
                                                <div class="geodir-category-content fl-wrap">
                                                    <h3 class="title-sin_item">
                                                        <router-link :to="'/single/' + item.propertyId">{{item.title}}</router-link></h3>
                                                    <div class="geodir-category-content_price">₮ {{calcPrice(item.price)}}</div>
                                                    <p class="desc-tag">{{item.description}}</p>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <div align="center" style="margin-bottom: 20px;">
                                        <el-pagination v-if="this.props.length > 0" background layout="prev, pager, next" @current-change="currantPageChanged" :page-size="4" :total="props.length" style="justify-content: center;"> </el-pagination>	
                                        <p v-else style="text-align: center; font-weight: 500;">Бүртгэгдсэн зар байхгүй</p>
                                    </div>				
                                </div>
                            </div>				
                        </div>
                    </div>
                </div>					
            </div>
        </div>
        <div class="limit-box fl-wrap"></div>
    </section>
</div>
</template>
<style scoped>
.bg-wrap .bg {
    background-image: url('@/assets/images/bg/1.jpg');
}

.card-info-media .bg {
    /* background-image: url('@/assets/images/agency/agent/1.jpg'); */
}
</style>

<script>
export default {
    data() {
        return {
            email: '',
            user: {
                name: '',
                email: '',
                image: '',
                phone: '',
                id: ''
            },
            props: [],
            settings: {
                city: [],
                district: []
            },
            currentPage: 1
        }
    },
    computed: {
        currentSlide() {
            return this.props.slice((this.currentPage - 1 ) * 4, this.currentPage * 4);
        }
    },
    created() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.user.viewed = 0;

      this.getCity();
      this.getAgentInfo();
    },
    mounted() {},
    methods: {
        currantPageChanged(page) {
            this.currentPage = page;
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
        getCity() {
            // this.$emit('changeLoader', true);
          this.$axios({
            method: 'post',
            url: `/props/get-city`,
            data: {}
          }).then(data => {
              this.settings.city = data.data.city;
              this.settings.district = data.data.district;
          });
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
        getAgentInfo() {
          this.$emit('changeLoader', true);
          this.$axios({
            method: 'post',
            url: `/user/get-info`,
            data: {
                id: this.user.id
            }
          }).then(data => {
            if(data.data.status === 200) {
              this.props = data.data.property;
            }
            this.$emit('changeLoader', false);
          });
        }
    }
}
</script>
