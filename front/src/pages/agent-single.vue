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
                    <!-- content-tabs-wrap -->
                    <div class="content-tabs-wrap tabs-act fl-wrap">
                        <div class="content-tabs fl-wrap">
                            <ul class="tabs-menu fl-wrap no-list-style">
                                <li class="current"><a href="javascript:;">  Үүсгэсэн зарууд  </a></li>
                            </ul>
                        </div>
                        <!--tabs -->                       
                        <div class="tabs-container">
                            <!--tab -->
                            <div class="tab">
                                <div id="tab-listing" class="tab-content first-tab">
                                    <!-- listing-item-wrap-->
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
                                                            <!-- <a href="#" class="cat-opt blue-bg" v-if="item.special == 1">Энгийн</a> -->
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
                                                    <!-- <div class="geodir-category-content-details">
                                                        <ul>
                                                            <li><i class="fal fa-bed"></i><span>4</span></li>
                                                            <li><i class="fal fa-bath"></i><span>2</span></li>
                                                            <li><i class="fal fa-cube"></i><span>460 ft2</span></li>
                                                        </ul>
                                                    </div> -->
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <div align="center" style="margin-bottom: 20px;">
                                        <el-pagination background layout="prev, pager, next" @current-change="currantPageChanged" :page-size="4" :total="props.length"> </el-pagination>	
                                    </div>				
                                </div>
                            </div>
                            <!--tab  end-->
                            <!--tab -->
                            <div class="tab">
                                <div id="tab-reviews" class="tab-content">
                                    <div class="list-single-main-container fl-wrap" style="margin-top: 30px;">
                                        <!-- list-single-main-item -->
                                        <div class="list-single-main-item fl-wrap" id="sec6">
                                            <div class="list-single-main-item-title">
                                                <h3>Reviews <span>2</span></h3>
                                            </div>
                                            <div class="list-single-main-item_content fl-wrap">
                                                <div class="reviews-comments-wrap fl-wrap">
                                                    <div class="review-total">
                                                        <span class="review-number blue-bg">5.0</span>
                                                        <div class="listing-rating card-popup-rainingvis" data-starrating2="5"><span class="re_stars-title">Excellent</span></div>
                                                    </div>
                                                    <!-- reviews-comments-item -->  
                                                    <div class="reviews-comments-item">
                                                        <div class="review-comments-avatar">
                                                            <img src="@/assets/images/avatar/1.jpg" alt=""> 
                                                        </div>
                                                        <div class="reviews-comments-item-text smpar">
                                                            <div class="box-widget-menu-btn smact"><i class="far fa-ellipsis-h"></i></div>
                                                            <div class="show-more-snopt-tooltip bxwt">
                                                                <a href="#"> <i class="fas fa-reply"></i> Reply</a>
                                                                <a href="#"> <i class="fas fa-exclamation-triangle"></i> Report </a>
                                                            </div>
                                                            <h4><a href="#">Liza Rose</a></h4>
                                                            <div class="listing-rating card-popup-rainingvis" data-starrating2="5"><span class="re_stars-title">Excellent</span></div>
                                                            <div class="clearfix"></div>
                                                            <p>" Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. "</p>
                                                            <div class="reviews-comments-item-date"><span class="reviews-comments-item-date-item"><i class="far fa-calendar-check"></i>12 April 2018</span><a href="#" class="rate-review"><i class="fal fa-thumbs-up"></i>  Helpful Review  <span>6</span> </a></div>
                                                        </div>
                                                    </div>
                                                    <!--reviews-comments-item end--> 
                                                    <!-- reviews-comments-item -->  
                                                    <div class="reviews-comments-item">
                                                        <div class="review-comments-avatar">
                                                            <img src="@/assets/images/avatar/1.jpg" alt=""> 
                                                        </div>
                                                        <div class="reviews-comments-item-text smpar">
                                                            <div class="box-widget-menu-btn smact"><i class="far fa-ellipsis-h"></i></div>
                                                            <div class="show-more-snopt-tooltip bxwt">
                                                                <a href="#"> <i class="fas fa-reply"></i> Reply</a>
                                                                <a href="#"> <i class="fas fa-exclamation-triangle"></i> Report </a>
                                                            </div>
                                                            <h4><a href="#">Adam Koncy</a></h4>
                                                            <div class="listing-rating card-popup-rainingvis" data-starrating2="5"><span class="re_stars-title">Excellent</span></div>
                                                            <div class="clearfix"></div>
                                                            <p>" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere convallis purus non cursus. Cras metus neque, gravida sodales massa ut. "</p>
                                                            <div class="reviews-comments-item-date"><span class="reviews-comments-item-date-item"><i class="far fa-calendar-check"></i>03 December 2017</span><a href="#" class="rate-review"><i class="fal fa-thumbs-up"></i>  Helpful Review  <span>2</span> </a></div>
                                                        </div>
                                                    </div>
                                                    <!--reviews-comments-item end-->                                                                  
                                                </div>
                                            </div>
                                        </div>
                                        <!-- list-single-main-item end -->                                             
                                        <!-- list-single-main-item -->
                                        <div class="list-single-main-item fl-wrap" id="sec5">
                                            <div class="list-single-main-item-title fl-wrap">
                                                <h3>Add Your Review</h3>
                                            </div>
                                            <!-- Add Review Box -->
                                            <div id="add-review" class="add-review-box">
                                                <div class="leave-rating-wrap">
                                                    <span class="leave-rating-title">Your rating  for this listing : </span>
                                                    <div class="leave-rating">
                                                        <input type="radio"    data-ratingtext="Excellent"   name="rating" id="rating-1" value="1"/>
                                                        <label for="rating-1" class="fal fa-star"></label>
                                                        <input type="radio" data-ratingtext="Good" name="rating" id="rating-2" value="2"/>
                                                        <label for="rating-2" class="fal fa-star"></label>
                                                        <input type="radio" name="rating"  data-ratingtext="Average" id="rating-3" value="3"/>
                                                        <label for="rating-3" class="fal fa-star"></label>
                                                        <input type="radio" data-ratingtext="Fair" name="rating" id="rating-4" value="4"/>
                                                        <label for="rating-4" class="fal fa-star"></label>
                                                        <input type="radio" data-ratingtext="Very Bad "   name="rating" id="rating-5" value="5"/>
                                                        <label for="rating-5"    class="fal fa-star"></label>
                                                    </div>
                                                    <div class="count-radio-wrapper">
                                                        <span id="count-checked-radio">Your Rating</span>  
                                                    </div>
                                                </div>
                                                <!-- Review Comment -->
                                                <form   class="add-comment custom-form">
                                                    <fieldset>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <label>Your name* <span class="dec-icon"><i class="fas fa-user"></i></span></label>
                                                                <input   name="phone" type="text"    onClick="this.select()" value="">
                                                            </div>
                                                            <div class="col-md-6">
                                                                <label>Yourmail* <span class="dec-icon"><i class="fas fa-envelope"></i></span></label>
                                                                <input   name="reviewwname" type="text"    onClick="this.select()" value="">
                                                            </div>
                                                        </div>
                                                        <textarea cols="40" rows="3" placeholder="Your Review:"></textarea>
                                                    </fieldset>
                                                    <button class="btn big-btn color-bg float-btn">Submit Review <i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                                </form>
                                            </div>
                                            <!-- Add Review Box / End -->
                                        </div>
                                        <!-- list-single-main-item end -->             										
                                    </div>
                                </div>
                            </div>
                            <!--tab end-->							
                        </div>
                        <!--tabs end-->  
                    </div>
                    <!-- content-tabs-wrap end -->
                </div>
                <!-- col-md 8 end -->
                <!--  sidebar-->
                <div class="col-md-4">
                    <!--box-widget-->
                    <div class="box-widget bwt-first fl-wrap">
                        <div class="box-widget-title fl-wrap box-widget-title-color color-bg no-top-margin">Нийтлэгчийн мэдээлэл</div>
                        <div class="box-widget-content fl-wrap">
                            <div class="contats-list clm fl-wrap">
                                <ul class="no-list-style">
                                    <li><span><i class="fal fa-phone"></i> Утас :</span> <a href="#">+(976) - {{user.phone}}</a></li>
                                    <li><span><i class="fal fa-envelope"></i> Имэйл :</span> <a href="#">{{email}}</a></li>
                                    <li><span><i class="fal fa-map-marker"></i> Хаяг :</span> <a href="#"> - </a></li>
                                    <li><span><i class="fal fa-browser"></i> Вэбсайт :</span> <a href="#">www.gazar.mn</a></li>
                                </ul>
                            </div>
                            <!-- <div class="profile-widget-footer fl-wrap">
                                <div class="card-info-content_social ">
                                    <ul>
                                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                        <li><a href="#"><i class="fab fa-vk"></i></a></li>
                                    </ul>
                                </div>
                                <a href="#sec-contact" class="custom-scroll-link tolt csls" data-microtip-position="left" data-tooltip="Write Message"><i class="fal fa-paper-plane"></i></a>
                            </div> -->
                        </div>
                        <div class="content-tabs">
                            <ul class="tabs-menu fl-wrap no-list-style">
                                <li class="current" style="margin-top: 10px; width: 100%;"><a :href="'tel:' + user.phone">  Нийтлэгч рүү залгах  </a></li>
                            </ul>
                        </div>
                    </div>
                    <!--box-widget end --> 									
                    <!--box-widget-->
                    <!-- <div class="box-widget fl-wrap">
                        <div class="box-widget-fixed-init fl-wrap" id="sec-contact">
                            <div class="box-widget-title fl-wrap box-widget-title-color color-bg no-top-margin">Get In Touch</div>
                            <div class="box-widget-content fl-wrap">
                                <div class="custom-form">
                                    <form method="post"  name="contact-property-form">
                                        <label>Your name* <span class="dec-icon"><i class="fas fa-user"></i></span></label>
                                        <input   name="phone" type="text"    onClick="this.select()" value="">
                                        <label>Your mail  * <span class="dec-icon"><i class="fas fa-envelope"></i></span></label>
                                        <input   name="mail" type="text"    onClick="this.select()" value="">      
                                        <textarea cols="40" rows="3" placeholder="Your Message:" style="height: 150px"></textarea>
                                        <button type="submit" class="btn float-btn color-bg fw-btn"> Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!--box-widget end -->               									
                </div>
                <!--   sidebar end-->								
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
                image: '',
                viewed: 0,
                phone: ''
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
    mounted() {
        this.getCity();
        this.email = this.decodeFromBase64(this.$route.params.id);
        this.getAgentInfo();
    },
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
        decodeFromBase64(val) {
            return atob(val);
        },
        getAgentInfo() {
            this.$emit('changeLoader', true);
            this.$axios({
				method: 'post',
				url: `/user/agent-info`,
				data: {
                    email: this.email
                }
			}).then(data => {
                this.$emit('changeLoader', false);
                if(data.data.status == 200) {
                    this.user = data.data.info;
                    this.props = data.data.props;
                    this.props.sort(function(a,b) {
                        return b.special - a.special;
                    });
                } else {
                    this.$router.push('/');
                }
            });
        }
    }
}
</script>
