<template>
    <div>
        <footer class="main-footer fl-wrap">
            <div class="footer-inner fl-wrap">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="footer-widget fl-wrap">
                                <div class="footer-widget-logo fl-wrap">
                                    <img src="@/assets/images/logo.svg" alt="">
                                </div>
                                <!-- <p>Газар худалдах болон зарын </p> -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="footer-widget fl-wrap">
                                <div class="footer-widget-title fl-wrap">
                                    <h4>Холбоосууд</h4>
                                </div>
                                <ul class="footer-list fl-wrap">
                                    <li><router-link to="/">Нүүр</router-link></li>
                                    <li><router-link to="/list" >Жагсаалт</router-link></li>
                                    <li><a href="#">Агентууд</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="footer-widget fl-wrap">
                                <div class="footer-widget-title fl-wrap">
                                    <h4>Бидэнтэй холбогдох</h4>
                                </div>
                                <ul  class="footer-contacts fl-wrap">
                                    <!-- <li><span><i class="fal fa-envelope"></i> Имэйл :</span><a href="#" target="_blank">gazarmn99@gmail.com</a></li>
                                    <li> <span><i class="fal fa-map-marker"></i> Хаяг :</span><a href="#" target="_blank">-</a></li> -->
                                    <li><span><i class="fal fa-phone"></i> Утас :</span><a href="#">+(976) 
                                        <!-- 9919 8959 -->
                                        0000-0000
                                    </a></li>
                                </ul>
                                <!-- <div class="footer-social fl-wrap">
                                    <ul>
                                        <li><a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                                        <li><a href="#" target="_blank"><i class="fab fa-twitter"></i></a></li>
                                        <li><a href="#" target="_blank"><i class="fab fa-instagram"></i></a></li>
                                        <li><a href="#" target="_blank"><i class="fab fa-vk"></i></a></li>
                                    </ul>
                                </div> -->
                            </div>
                        </div>                                  
                    </div>
                </div>
            </div>

            <div class="sub-footer gray-bg fl-wrap">
                <div class="container">
                    <div class="copyright"> &#169; gazar.mn {{new Date().getFullYear()}} .</div>
                    <!-- <div class="subfooter-nav">
                        <ul class="no-list-style">
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div> -->
                </div>
            </div>              
        </footer>
    </div>
</template>
<script>
export default {
    name: 'Footer',
}
</script>