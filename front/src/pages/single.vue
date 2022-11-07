<style scoped>
 .yt-player-thumbnail-paused {
    opacity: 1
 }

 .yt-player-thumbnail-played {
    opacity: 0
 }

</style>
<template>
    <div class="content">
        <vue3-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        :filename="propertyId"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf"
    >
    </vue3-html2pdf>
        <div class="gray-bg small-padding fl-wrap">
            <div class="container">
                <div class="row">
                    <!--  listing-single content -->
                    <div class="col-md-8">
                        <div class="list-single-main-wrapper fl-wrap">
                            <div class="list-single-opt_header fl-wrap">
                                <ul class="list-single-opt_header_cat">
                                    <!-- <li><a href="#" class="cat-opt color-bg">Rent</a></li> -->
                                    <li><a href="#" class="cat-opt blue-bg">{{property.info.usename}}</a></li>
                                    <li><a href="#" class="cat-opt color-bg">{{property.info.intent}}</a></li>
                                </ul>
                                <div class="share-holder hid-share">
                                    <a href="#" class="share-btn showshare sfcs">  <i class="fas fa-share-alt"></i>  Share   </a>
                                    <div class="share-container  isShare"></div>
                                </div>
                            </div>
                            <!--  list-single-opt_header end -->
                            <!--  list-single-header-item-->
                            <div class="list-single-header-item  fl-wrap" id="sec1">
                                <div class="row">
                                    <div class="col-md-8">
                                        <h1>{{property.info.title}} <span class="verified-badge tolt" data-microtip-position="bottom"  data-tooltip="Verified"><i class="fas fa-check"></i></span></h1>
                                        <div class="geodir-category-location fl-wrap">
                                            <a href="#"><i class="fas fa-map-marker-alt"></i>  {{getDistrict(property.info.district)}}, {{getCityname(property.info.city)}}</a> 
                                            <!-- <div class="listing-rating card-popup-rainingvis" data-starrating2="4"><span class="re_stars-title">Good</span></div> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <router-link class="host-avatar-wrap" to="/agent">
                                        <span>{{property.info.name}}</span>
                                        <img :src="$appUrl + '/images/member/' + property.info.image" alt="">
                                        </router-link>
                                    </div>
                                </div>
                                <div class="list-single-header-footer fl-wrap">
                                    <div class="list-single-header-price" data-propertyprise="50500"><strong>Үнэ:</strong><span>₮</span>{{calcPrice(property.info.price)}}</div>
                                    <div class="list-single-header-date"><span>Огноо:</span>{{property.info.created_at}}</div>
                                    <div class="list-single-stats">
                                        <ul class="no-list-style">
                                            <li><span class="viewed-counter"><i class="fas fa-eye"></i> Үзсэн -  {{property.info.watched}} </span></li>
                                            <!-- <li><span class="bookmark-counter"><i class="fas fa-heart"></i> Bookmark -  24 </span></li> -->
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="list-single-main-media fl-wrap">
                                <div class="single-slider-wrapper carousel-wrap fl-wrap">
                                    <div class="slider-for fl-wrap carousel lightgallery">
                                        <swiper :loop="true" :spaceBetween="10" :navigation="navigation" :thumbs="{ swiper: thumbsSwiper }" :modules="modules" class="mySwiper2">
                                            <swiper-slide v-for="(item, index) in property.carousel" :key="index">
                                                <!--  slick-slide-item -->
                                                <div class="slick-slide-item">
                                                    <div class="box-item">
                                                        <a href="javascript:;" @click="showPopupImage(index)" class="gal-link popup-image"><i class="fal fa-search"></i></a>
                                                        <img :src="$appUrl + '/images/property/' + item.imagename" alt="">
                                                    </div>
                                                </div>
                                                <!--  slick-slide-item end -->
                                            </swiper-slide>
                                        </swiper>    
                                    </div>
                                    <div class="swiper-button-prev ssw-btn"><i class="fas fa-caret-left"></i></div>
                                    <div class="swiper-button-next ssw-btn"><i class="fas fa-caret-right"></i></div>
                                </div>
                                <div class="single-slider-wrapper fl-wrap">
                                    <div class="slider-nav fl-wrap">
                                        <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="0" :slidesPerView="4" :freeMode="true" :watchSlidesProgress="true" class="mySwiper">
                                            <swiper-slide class="slick-slide-item" v-for="(item, index) in property.carousel" :key="index">
                                                <img :src="$appUrl + '/images/property/' + item.imagename" alt="">
                                            </swiper-slide>
                                            <!-- <swiper-slide class="slick-slide-item">
                                                <img src="@/assets/images/all/1.jpg" alt="">
                                            </swiper-slide> -->
                                        </swiper>
                                        <!-- <div class="slick-slide-item"><img src="@/assets/images/all/1.jpg" alt=""></div> -->
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="list-single-facts fl-wrap">
                                <div class="inline-facts-wrap">
                                    <div class="inline-facts">
                                        <i class="fal fa-keyboard"></i>
                                        <h6>Төрөл</h6>
                                        <span>Газар</span>
                                    </div>
                                </div>
                                <div class="inline-facts-wrap">
                                    <div class="inline-facts">
                                        <i class="fal fa-users"></i>
                                        <h6>м2</h6>
                                        <span>31,000</span>
                                    </div>
                                </div>
                                <div class="inline-facts-wrap">
                                    <div class="inline-facts">
                                        <i class="fal fa-industry"></i>
                                        <h6>Хашаа</h6>
                                        <span>Байгаа</span>
                                    </div>
                                </div>
                                <div class="inline-facts-wrap">
                                    <div class="inline-facts">
                                        <i class="fal fa-warehouse"></i>
                                        <h6>Байшин / Барилга</h6>
                                        <span>Байхгүй</span>
                                    </div>
                                </div>                                                                 
                            </div> -->
                            <div class="list-single-main-container fl-wrap">
                                <!-- list-single-main-item -->
                                <div class="list-single-main-item fl-wrap">
                                    <div class="list-single-main-item-title">
                                        <h3>Дэлгэрэнгүй</h3>
                                    </div>
                                    <div class="list-single-main-item_content fl-wrap">
                                        <p>{{property.info.description}}</p>
                                    </div>
                                </div>
                                <!-- list-single-main-item end -->                                          
                                <!-- list-single-main-item -->
                                <div class="list-single-main-item fl-wrap" id="sec2">
                                    <div class="list-single-main-item-title">
                                        <h3>Бусад хүчин зүйлс</h3>
                                    </div>
                                    <div class="list-single-main-item_content fl-wrap">
                                        <div class="details-list">
                                            <ul>
                                                <li style="width: 40%"><span>Зарын дугаар:</span>{{propertyId}}</li>
                                                <li style="width: 25%"><span>Лизинг:</span>Боломжгүй</li>
                                                <li style="width: 35%; text-align: right;"><span>Аймаг / Хот:</span>{{getCityname(property.info.city)}}</li>
                                                <li><span>Сум / Дүүрэг:</span>{{getDistrict(property.info.district)}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>                                          
                                <!-- list-single-main-item -->
                                <div class="list-single-main-item fl-wrap" id="sec4" v-if="property.info.video">
                                    <div class="list-single-main-item-title">
                                        <h3>Video</h3>
                                    </div>
                                    <div class="list-single-main-item_content fl-wrap">
                                        <div class="video-box fl-wrap" style="position: relative;">
                                            <!-- <div class="hytPlayerWrapOuter">
                                                <div class="hytPlayerWrap">
                                                    <iframe style="width: 300%; margin-left: -100%;" @load="videoLoaded"  src="https://www.youtube.com/embed/2nyGJhSa3hI?controls=0" title="[MV] LEE MU JIN(이무진) _ Reference(참고사항) (Latte(라떼) Ver.)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                </div> -->
                                            <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;">
                                                <img :src="'https://img.youtube.com/vi/' + property.info.video + '/0.jpg'" alt="youtube-thumbnail-img" style="width: 100%; height: 100%;" @click="pauseVideo" v-bind:class="{'yt-player-thumbnail-paused': !videoPlayed, 'yt-player-thumbnail-played': videoPlayed}">
                                                <img src="@/assets/images/youtube-thumbnail.png" alt="" style="position: absolute; top: 50%; left: 50%; width: 10%; height: auto; cursor: pointer; transform: translate(-50%, -50%);" @click="playVideo" v-if="!videoPlayed">
                                            </div>
                                            <div id="yt-player"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-single-main-item fw-lmi fl-wrap" id="sec5">
                                    <div class="map-container mapC_vis mapC_vis2">
                                        <!-- <div id="singleMap" data-latitude="40.7427837" data-longitude="-73.11445617675781" data-mapTitle="Our Location" data-infotitle="House in Financial Distric" data-infotext="70 Bright St New York, USA"></div> -->
                                        <div id="map" style="height: 500px"></div>
                                    </div>
                                </div>
                                <!-- list-single-main-item end -->                                          
                                <!-- list-single-main-item -->
                                <div class="list-single-main-item fl-wrap" id="sec6">
                                    <div class="list-single-main-item-title fl-wrap">
                                        <h3>Үнэлгээ</h3>
                                    </div>
                                    <!-- Add Review Box -->
                                    <div id="add-review" class="add-review-box">
                                        <div class="leave-rating-wrap">
                                            <span class="leave-rating-title">Таны үнэлгээ : </span>
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
                                        </div>
                                        <!-- Review Comment -->
                                        <form class="add-comment custom-form">
                                            <fieldset>
                                                <div class="row">
                                                    <div class="col-md-6" style="margin-bottom: 20px;">
                                                        <label>Нэр* <span class="dec-icon"><i class="fas fa-user"></i></span></label>
                                                        <input name="phone" type="text" class="form-inputs" value="">
                                                    </div>
                                                    <div class="col-md-6" style="margin-bottom: 20px;">
                                                        <label>Имэйл* <span class="dec-icon"><i class="fas fa-envelope"></i></span></label>
                                                        <input name="reviewwname" type="text" class="form-inputs" value="">
                                                    </div>
                                                </div>
                                                <textarea cols="40" rows="3" placeholder="Сэтгэгдэл:"></textarea>
                                            </fieldset>
                                            <button class="btn big-btn color-bg float-btn">Илгээх <i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                        </form>
                                    </div>
                                    <!-- Add Review Box / End -->
                                </div>
                                <!-- list-single-main-item end -->                                            
                            </div>
                        </div>
                    </div>
                    <!-- listing-single content end-->
                    <!-- sidebar -->
                    <div class="col-md-4">
                        <!--box-widget-->
                        <div class="box-widget fl-wrap">
                            <div class="profile-widget">
                                <div class="profile-widget-header color-bg smpar fl-wrap">
                                    <div class="pwh_bg"></div>
                                    <div class="call-btn"><a href="tel:123-456-7890" class="tolt color-bg" data-microtip-position="right"  data-tooltip="Call Now"><i class="fas fa-phone-alt"></i></a></div>
                                    <div class="box-widget-menu-btn smact"><i class="far fa-ellipsis-h"></i></div>
                                    <div class="show-more-snopt-tooltip bxwt">
                                        <a href="#"> <i class="fas fa-comment-alt"></i> Write a review</a>
                                        <a href="#"> <i class="fas fa-exclamation-triangle"></i> Report </a>
                                    </div>
                                    <div class="profile-widget-card">
                                        <div class="profile-widget-image">
                                            <!-- <img src="@/assets/images/avatar/1.jpg" alt=""> -->
                                            <img :src="$appUrl + '/images/member/' + property.info.image" alt="">
                                        </div>
                                        <div class="profile-widget-header-title">
                                            <h4><router-link to="/agent">{{property.info.name}}</router-link></h4>
                                            <div class="clearfix"></div>
                                            <div class="pwh_counter"><span>01</span>Байршуулсан</div>
                                            <div class="clearfix"></div>
                                            <div class="listing-rating card-popup-rainingvis" data-starrating2="4"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-widget-content fl-wrap">
                                    <div class="contats-list fl-wrap">
                                        <ul class="no-list-style">
                                            <li><span><i class="fal fa-phone"></i> Утас :</span> <a href="#">+(976) {{property.info.phone}}</a></li>
                                            <li><span><i class="fal fa-envelope"></i> Имэйл :</span> <a href="#">{{property.info.email}}</a></li>
                                            <li><span><i class="fal fa-browser"></i> Вэбсайт :</span> <a href="#">-</a></li>
                                        </ul>
                                    </div>
                                    <div class="profile-widget-footer fl-wrap">
                                        <router-link :to="'/agent/' + encodeToBase64(property.info.email, property.info)" class="btn float-btn color-bg small-btn">Нийтлэгчтэй холбогдох</router-link>
                                        <a href="javascript:;" @click="reportClickBtn" class="btn small-btn tolt" style="background: #a30b00; float: right;" data-microtip-position="bottom"  data-tooltip="Гомдол илгээх"><i class="fal fa-paper-plane"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--box-widget end -->
                        <!--box-widget-->
                        <div class="box-widget fl-wrap">
                            <div class="box-widget-title fl-wrap">Санал болгох</div>
                            <div class="box-widget-content fl-wrap">
                                <!--widget-posts-->
                                <div class="widget-posts  fl-wrap">
                                    <ul class="no-list-style">
                                        <li v-for="(item, index) in properties.slice(0,5)" :key="index">
                                            <div class="widget-posts-img"><router-link :to="'/single/' + item.propertyId"><img :src="$appUrl + '/images/property/' + item.imagename" alt=""></router-link>  
                                            </div>
                                            <div class="widget-posts-descr">
                                                <h4><router-link :to="'/single/' + item.id">{{item.title}}</router-link></h4>
                                                <div class="geodir-category-location fl-wrap"><a href="#"><i class="fas fa-map-marker-alt"></i> {{getDistrict(item.district)}}, {{getCityname(item.city)}}</a></div>
                                                <div class="widget-posts-descr-price"><span>Үнэ: </span> ₮ {{calcPrice(item.price)}}</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <!-- widget-posts end-->                                                           
                                <router-link to="/list" class="btn float-btn color-bg small-btn">Бүх жагсаалтыг харах</router-link>
                            </div>
                        </div>
                        <div class="box-widget fl-wrap">
                            <div class="box-widget-title fl-wrap">Зар татаж авах</div>
                            <div class="box-widget-content fl-wrap">
                                <div class="bwc_download-list">
                                    <a href="javascript:;" @click="exportToPdf"><span><i class="fal fa-file-pdf"></i></span>{{propertyId}}.pdf</a>
                                    <!-- <a href="#" download><span><i class="fal fa-file-word"></i></span>Energetic Certificate</a>
                                    <a href="#" download><span><i class="fal fa-file-pdf"></i></span>Property Plans</a> -->
                                </div>
                            </div>
                        </div>
                        <!--box-widget end -->                                   
                    </div>
                    <!--  sidebar end-->                            
                </div>
                <div class="fl-wrap limit-box"></div>
                <div class="listing-carousel-wrapper carousel-wrap fl-wrap">
                    <div class="list-single-main-item-title">
                        <h3>Төстэй зарууд</h3>
                    </div>
                    <div class="listing-carousel carousel ">
                        <!-- slick-slide-item -->
                        <swiper :modules="modules" :breakpoints="breakpoints" :navigation="navigation2" :pagination="{ clickable: true, el: '.swiper-pagination1'}" :spaceBetween="30" class="mySwiper" >
                            <swiper-slide v-for="(item, index) in similarProps" :key="index" class="mobile-slider">
                                <div class="slick-slide-item">
                                <!-- listing-item -->
                                <div class="listing-item">
                                    <article class="geodir-category-listing fl-wrap">
                                        <div class="geodir-category-img fl-wrap">
                                            <router-link :to="'/single/' + item.propertyId" class="geodir-category-img_item">
                                                <img :src="$appUrl + '/images/property/' + item.imagename" alt="">
                                                <div class="overlay"></div>
                                            </router-link>
                                            <div class="geodir-category-location">
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
                                                <router-link to="/agenft" class="gcf-company"><img :src="$appUrl + '/images/member/' + item.image" alt=""><span>By {{item.name}}</span></router-link>
                                                <div class="listing-rating card-popup-rainingvis tolt" data-microtip-position="top" data-tooltip="Excellent" data-starrating2="5"></div>
                                            </div> -->
                                        </div>
                                    </article>
                                </div>
                                <!-- listing-item end-->							
                            </div>
                            <!-- slick-slide-item end-->	
                            </swiper-slide>
                        </swiper>							
                    </div>
                    <div class="swiper-button-prev lc-wbtn lc-wbtn_prev"><i class="far fa-angle-left"></i></div>
                    <div class="swiper-button-next lc-wbtn lc-wbtn_next"><i class="far fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="demo-image__preview">
            <el-image
                hidden
                style="width: 100px; height: 100px"
                ref="imagePreview"
                id="imagePreview"
                :src="preview.url"
                :preview-src-list="preview.list"
                :initial-index="preview.idx"
                :hide-on-click-modal="true"
                fit="cover"
            />
        </div>

        <el-dialog v-model="dialog.report" title="Гомдол илгээх" center :style="styleObject">
            <span>
                <el-select v-model="report.value" filterable placeholder="Сонгох" style="width: 100%;" size="large">
                    <el-option
                    style="text-align: left;"
                    v-for="item in report.option"
                    :key="item + '-report'"
                    :label="item"
                    :value="item"
                    />
                </el-select>
                <el-input style="margin-top: 10px;" v-model="report.description" show-word-limit :rows="3" maxlength="100" type="textarea" placeholder="Дэлгэрэнгүй" />
            </span>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialog.report = false">Болих</el-button>
                <el-button type="primary" @click="sendReport">
                Илгээх
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/thumbs"

// import required modules
import {FreeMode,Navigation,Thumbs} from 'swiper';
import Vue3Html2pdf from 'vue3-html2pdf'
export default {
    components: {
        Swiper,
        SwiperSlide,
        Vue3Html2pdf
    },
    data () {
        return {
            report: {
                option: ['Зарагдсан бараа', 'Буруу үнэ', 'Буруу дугаар', 'Зураг утга илэрхийлэхгүй байна', 'Спам', 'Залилан', 'Бусад'],
                description: '',
                value: 'Зарагдсан бараа'
            },
            dialog: {
                report: false
            },
            pdfOptions: {
                margin: 15,
                image: {
                    type: 'jpeg',
                    quality: 1,
                },
                html2canvas: { scale: 3 },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'p',
                },
            },
            propertyId: '',
            property: {
                info: {
                    empName: '',
                    empPhone: '',
                    empPhoto: '',
                    phone: '',
                    email: '',
                    image: 'default.jpg',
                    name: '',
                    watched: 0,
                    title: '',
                    description: '',
                    price: 0,
                    special: 1,
                    city: 1,
                    district: 1,
                    created_at: '',
                    propertyId: '',
                    discount: 0
                },
                polygons: [],
                carousel: []
            },
            properties: [],
            similarProps: [],
            fixedTopDiv: 0,
            videoPlayer: false,
            thumbsSwiper: null,
            modules: [FreeMode, Navigation, Thumbs],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            navigation2: { nextEl: '.lc-wbtn_next', prevEl: '.lc-wbtn_prev' },
            breakpoints: {
                0: { slidesPerView: 'auto' },
                500: { slidesPerView: 'auto' },
                1024: { slidesPerView: 4 }
            },
            settings: {
                city: [],
                district: [],
                map: null
            },
            preview: {
                url: '',
                list: [],
                idx: 1  
            },
            player: null,
            videoPlayed: false,
            styleObject: {
                width: '30%'
            }
        };
    },
    computed: {
        fixedTop() {
            return this.fixedTopDiv + 'px';
        }
    },
    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
    methods: {
        reportClickBtn() {
            const token = localStorage.getItem('token');
             if (!token) {
                this.$notify({
                    title: 'Амжилтгүй',
                    message: 'Нэвтрэх шаардлагатай',
                    type: 'error',
                });
                return;
             }
            this.dialog.report = true
        },
        sendReport() {
            this.$axios({
				method: 'post',
				url: `/props/send-report`,
				data: {
                    propertyId: this.propertyId,
                    title: this.report.value,
                    description: this.report.description
                }
			}).then(data => {
                if (data.data.status === 200) {
                    this.$notify({
                        title: 'Амжилттай',
                        message: 'Илгээгдлээ',
                        type: 'success',
                    });

                    this.report.description = '';
                    this.dialog.report = false;
                } 
            });
        },
        myEventHandler() {
            if (window.innerWidth > 1063) {
                this.styleObject = {width: '30%'};
            } else {
                this.styleObject = {width: '80%'};
            }
        },
        getBase64FromUrl(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        },
        makeBase64(event) {
            if (event.currentTarget.getAttribute('generated') == 'true') {
                return;
            }
            const elm = event.currentTarget;
            this.getBase64FromUrl(elm.src, function(mybase64) {
                elm.src = mybase64;
                elm.setAttribute('generated', true);
                return;
            });
        },
        exportToPdf() {
            this.$refs.html2Pdf.generatePdf();
        },
        pauseVideo() {
            this.player.pauseVideo();
            this.videoPlayed = false;
        },
        playVideo() {
            this.player.playVideo();
            setTimeout(() => {
               this.videoPlayed = true; 
            }, 200);
        },
        getYTFrame() {
            this.player = new YT.Player('yt-player', {
                width: '100%',
                videoId: '2nyGJhSa3hI',
                playerVars: { 'autoplay': 0, 'controls': 0 }
            });
        },
        videoLoaded(event) {
            let wd = event.currentTarget.clientWidth / 3;
            let ht = wd / 16 * 9;
            event.currentTarget.style.height = ht + 'px';


            if (window.hideYTActivated) {
                return;
            }
        },
        encodeToBase64(val, info) {
            return btoa(val);
        },
        getSimilarProps () {
            this.$axios({
				method: 'post',
				url: `/props/similar-property`,
				data: {
                    propertyId: this.propertyId
                }
			}).then(data => {
                this.similarProps = data.data.similar;
                this.similarProps.sort(function(a,b) {
                    return b.special - a.special;
                });
            });
        },
        getRecommended () {
            this.$axios({
				method: 'post',
				url: `/props/recommended-property`,
				data: {}
			}).then(data => {
                this.properties = data.data.recommended
            });
        },
        async initMap() {
            // eslint-disable-next-line no-undef
            this.settings.map = new google.maps.Map(document.getElementById('map'), {
                center: this.property.polygons[0],
                zoom: true,
                maxZoom: 20,
                minZoom: 3,
                // eslint-disable-next-line no-dupe-keys
                zoom: 15,
                mapTypeId: 'satellite',
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true
            })
            this.setPolygons();
        },
        setPolygons() {
            // eslint-disable-next-line no-undef
            var mapPath = new google.maps.Polygon({
                paths: this.property.polygons,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });

            if(this.property.polygons.length > 2) {
                mapPath.setMap(this.settings.map);
            }
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
        setThumbsSwiper (swiper) {
            this.thumbsSwiper = swiper;
        },
        showPopupImage(idx) {
            this.preview.idx = idx;
            const el = document.getElementById("imagePreview");
            el.click();

            setTimeout(() => {
                const eleme = document.querySelector('.el-image-viewer__close');
                if(eleme) {
                    eleme.style.marginTop = '50px';
                }
            }, 100);
        },
        getCity() {
            this.$axios({
				method: 'post',
				url: `/props/get-city`,
				data: {}
			}).then(data => {
                this.settings.city = data.data.city;
                this.settings.district = data.data.district;
            });
        },
        getSingleProps() {
            this.$axios({
				method: 'post',
				url: `/props/single-property`,
				data: {
                    propertyId: this.propertyId
                }
			}).then(data => {
                if(data.data.result == 200) {
                    this.property = data.data.property;
                    this.property.carousel.forEach(( el, index ) => {
                        if(index == 0) {
                            this.preview.url = this.$appUrl + '/images/property/' + el.imagename;
                        }
                        this.preview.list.push(this.$appUrl + '/images/property/' + el.imagename);
                    });
                    this.property.polygons.forEach(el => {
                        el.lat = Number(el.lat);
                        el.lng = Number(el.lng);
                    });
                    this.initMap();
                    this.buildPdf();
                    if (this.property.info.video) {
                        setTimeout(() => {
                            this.getYTFrame();
                        }, 1000);
                    }
                } else {
                    console.log('not found');
                    this.$router.push({ name: 'page-not-found'});
                }
            });
        },
        initData() {
            this.getSingleProps();
            this.getSimilarProps();
            this.getRecommended();
        },
        buildPdf () {
            const pdfContent = document.querySelector('.vue-html2pdf section.content-wrapper');
            let html = '';
            this.property.carousel.forEach((element, index) => {
                index < 2 ? html += '<img style="width: 70%; height: auto;" src="' + this.$appUrl + '/images/property/' + element.imagename + '" alt="">': null;
            });

            html += `
                <table style="margin: 20px;">
                <style> tr td { padding: 20px; text-align: left;} td.table-title { font-weight: 700; width: 30% !important;}</style>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Тайлбар</td>
                        <td style="border: 1px solid black;">${this.property.info.title}</td>
                    </tr>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Үнэ</td>
                        <td style="border: 1px solid black;">${this.calcPrice(this.property.info.price)}</td>
                    </tr>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Ашиглалтын төрөл</td>
                        <td style="border: 1px solid black;">${this.property.info.usename}</td>
                    </tr>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Зориулалт</td>
                        <td style="border: 1px solid black;">${this.property.info.intent}</td>
                    </tr>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Огноо</td>
                        <td style="border: 1px solid black;">${this.property.info.created_at}</td>
                    </tr>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Байршил</td>
                        <td style="border: 1px solid black;">${this.getDistrict(this.property.info.district)}, ${this.getCityname(this.property.info.city)}</td>
                    </tr>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Лизинг</td>
                        <td style="border: 1px solid black;">Боломжгүй</td>
                    </tr>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Тайлбар</td>
                        <td style="border: 1px solid black;">${this.property.info.description}</td>
                    </tr>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Холбогдох утас</td>
                        <td style="border: 1px solid black;">+976 ${this.property.info.phone}</td>
                    </tr>
                    <tr>
                        <td class="table-title" style="border: 1px solid black;" width="50%">Имэйл</td>
                        <td style="border: 1px solid black;">${this.property.info.email}</td>
                    </tr>
                </table>
            `

            pdfContent.innerHTML = html;
        }
    },
    beforeRouteUpdate(to, from) {
        this.propertyId = to.params.id;
        this.initData();
    },
    mounted() {        
        this.propertyId = this.$route.params.id;
        this.getCity();
        this.initData();
    }
}
</script>
<style scoped>
@import url('https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lightgallery.css');
@import url('https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-zoom.css');
@media only screen and (max-width: 1024px) {
    .lc-wbtn {
        display: none;
    }
}

.single-map-item {
    width: 70%;
    text-align: left;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

@media (max-width: 1024px) {
    .mobile-slider {
        width: 40%;
    }
}

@media (max-width: 800px) {
    .mobile-slider {
        width: 80%;
    }
}
</style>