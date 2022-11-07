<!-- eslint-disable vue/multi-word-component-names -->
<style lang="css" scoped>
.price-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 30px;
    /* column-gap: 10px; */
}


.price-col {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    background: #fff;
}

.price-container .title {
    font-size: 15px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 40px;
    color: #000;
}


.price-container .price {
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #000;
}

.price-container .list tr {
    width: 100%;
    display: flex;
    justify-content: center;
    background: #fff;
    line-height: 1;
    position: relative;
}

.price-container .list {
    margin-bottom: 10px;
}

.price-container .list td {
    width: 100%;
    border: none;
}

.price-container .list td:nth-child(1) {
    width: 30%;
    text-align: right;
}

.price-container .list td:nth-child(2) {
    text-align: left;
    font-size: 10px;
}

.price-container .list svg {
    width: 20%;
    height: auto;
    fill: #008BCF;
}

.price-container .choose--btn {
    margin-bottom: 30px;
    width: 60%;
    padding: 10px 7px 10px 7px;
    border: none;
    background: #fff;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
}

.price-col:nth-child(2) {
    transform: scale(1.2);
    background: #008BCF;
    color: #fff;
    z-index: 1000;
}

.price-col:nth-child(2) tr{
    background: #008BCF;
}

.price-col:nth-child(2) svg, .price-col:nth-child(2) .price {
    fill: #fff;
    color: #fff;
}
.price-col:nth-child(2) .title {
    color: #fff;
    margin-top: 40px;
}

.best-value {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    color: #008BCF;
    padding: 5px 7px 5px 7px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 10px;
    font-weight: 600;
}

@media ( max-width: 720px) {
   .price-container {
        display: grid;
        grid-template-columns: 1fr;
    } 
    .price-col:nth-child(2) {
        transform: scale(1);
    }

    .price-container {
        margin: 0;
        margin-top: 20px;
    }

    .price-col {
        margin-top: 10px;
    }
}
</style>
<template>
    <div class="dashboard-content" style="background: #F5F7FB;">
            <div class="container dasboard-container">		
                <div class="dasboard-wrapper fl-wrap no-pag">
                    <div class="dasboard-widget-box fl-wrap card-box">
                        <div class="custom-form">
                            <!-- <div align="left" :style="{'font-size': '15px', 'font-weight': 700, 'color': '#008BCF', opacity: 0.7}"><strong>Үндсэн мэдээлэл</strong></div> -->
                            <div class="row" style="margin-bottom: 20px;">
                                <div class="col-md-12"> <label>Үндсэн мэдээлэл</label> </div>
                                <el-form :model="property.main" :rules="regex" ref="propertyMain">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <label>Гарчиг: *</label>
                                                <el-form-item prop="title" style="width: 100%; margin-bottom: 0;">
                                                    <el-input maxlength="100" v-model="property.main.title" class="w-50 m-2" size="large" placeholder="ж: газар зарна..." :prefix-icon="Search" />
                                                </el-form-item>

                                                <label>Газрын төрөл: *</label>
                                                <el-form-item prop="types" style="width: 100%; margin-bottom: 0;">
                                                    <el-select v-model="property.main.types" filterable placeholder="..." size="large" style="width: 100%; height: 100%;">
                                                        <el-option style="text-align: left;"
                                                        v-for="(item, index) in settings.types"
                                                        :key="index"
                                                        :label="item.typename"
                                                        :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <label>Газрын зориулалт: *</label>
                                                <el-form-item prop="intent" style="width: 100%; margin-bottom: 0;">
                                                    <el-select v-model="property.main.intent" filterable placeholder="..." size="large" style="width: 100%;">
                                                        <el-option style="text-align: left;"
                                                        v-for="(item, index) in settings.intent"
                                                        :key="index"
                                                        :label="item.intent"
                                                        :value="item.id">
                                                        </el-option>
                                                    </el-select>	
                                                </el-form-item>											
                                            </div>
                                            <div class="col-sm-6">
                                                <label>Ашиглалтын хэлбэр: *</label>
                                                <el-form-item prop="usage" style="width: 100%; margin-bottom: 0;">
                                                    <el-select v-model="property.main.usage" filterable placeholder="..." size="large" style="width: 100%;">
                                                        <el-option style="text-align: left;"
                                                        v-for="(item, index) in settings.usage"
                                                        :key="index"
                                                        :label="item.usename"
                                                        :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <label>Хэмжээ: *</label>
                                                <el-form-item prop="sizes" style="width: 100%; margin-bottom: 0;">
                                                    <el-select v-model="property.main.sizes" filterable placeholder="..." size="large" style="width: 100%;">
                                                        <el-tooltip
                                                            class="box-item"
                                                            effect="dark"
                                                            :content="item.sizeTitle"
                                                            placement="right-start"
                                                            v-for="(item, index) in settings.sizes"
                                                            :key="index"
                                                        >
                                                            <el-option style="text-align: left;"
                                                            :label="item.size"
                                                            :value="item.id">
                                                            </el-option>
                                                        </el-tooltip>
                                                    </el-select>
                                                </el-form-item>		
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <label>Үнэ (САЯ): *</label>
                                                        <el-form-item prop="price" style="width: 100%; margin-bottom: 0;">                                                
                                                            <el-input v-model="property.main.price" class="w-50 m-2" size="large" placeholder="ж: 180..." :prefix-icon="Search" />													
                                                        </el-form-item>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <label>Лизинг: *</label>
                                                        <el-checkbox v-model="property.main.lizing" :label="lizingText" border size="large" style="margin: 0;"></el-checkbox>
                                                    </div>
                                                </div>									
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <label>Зарын дэлгэрэнгүй: * ( {{ property.main.description.length}} / 1000 )</label>
                                        <el-form-item prop="description" style="width: 100%; margin-bottom: 0;">
                                            <div class="listsearch-input-item" style="width: 100%;">
                                                <textarea cols="40" rows="3" v-model="property.main.description" maxlength="1000" :show-word-limit="true" style="height: 210px" placeholder="..." spellcheck="false"></textarea>
                                                <!-- <el-input type="textarea" maxlength="1000" show-word-limit="true" :rows="4"  placeholder="..." v-model="property.main.description"> </el-input> -->
                                            </div>
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                    </div>
                    <!-- dasboard-widget-box  end-->	

                    <div class="dasboard-widget-box fl-wrap card-box">
                        <div class="custom-form">
                            <div class="row" style="margin-bottom: 20px;">
                                <!-- <div align="left" :style="{'font-size': '15px', 'font-weight': 700, 'color': '#008BCF', opacity: 0.7}"><strong>Байршил</strong></div> -->
                                <div class="col-md-12"> <label>Байршил</label> </div>
                                <el-form :model="property.location" :rules="regexAdress" ref="propertyLocation">
                                    <div class="col-sm-6">
                                        <label>Хот / Аймаг:</label>
                                        <el-form-item prop="city" style="width: 100%; margin-bottom: 0;">
                                            <el-select @change="changedCity" v-model="property.location.city" filterable placeholder="..." size="large" style="width: 100%; height: 100%;">
                                                <el-option style="text-align: left;"
                                                v-for="(item, index) in settings.city"
                                                :key="index"
                                                :label="item.cityname"
                                                :value="item.id">
                                                </el-option>
                                            </el-select>	
                                        </el-form-item>											
                                    </div>
                                    <div class="col-sm-6">
                                        <label>Сум / Дүүрэг:</label>
                                        <el-form-item prop="district" style="width: 100%; margin-bottom: 0;">
                                            <el-select @change="GeolocaderWithCity" v-model="property.location.district" filterable placeholder="..." size="large" style="width: 100%;">
                                                <el-option style="text-align: left;"
                                                v-for="(item, index) in districts"
                                                :key="index"
                                                :label="item.district"
                                                :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-form>
                                <div class="col-sm-12" :style="{'margin-top': '20px', 'border-radius': '20px'}">
                                    <div style="margin-bottom: 20px;">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>Latitude</td>
                                                    <td>Longitude</td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in property.location.polygons" :key="index">
                                                    <td style="width: 40%;">
                                                        <div class="cut-text">{{item.lat}}</div>
                                                    </td>
                                                    <td style="width: 40%;">
                                                        <div class="cut-text">{{item.lng}}</div>
                                                    </td>
                                                    <td style="width: 20%; max-width: 20%;">
                                                        <!-- <a href="javascript:;" class="color-bg" @click="removePolyline(index)" style="padding: 5px; color: #fff; border-radius: 5px;">Устгах </a> -->
                                                        <a href="javascript:;" class="color-bg" @click="removePolyline(index)" style="padding: 5px; color: #fff; border-radius: 5px; background: #f24f44"><i class="fa fa-trash"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div id="map" style="height: 500px"></div>
                                </div>
                            </div>
                        </div>
                    </div>											
                    <!-- dasboard-widget-box  -->
                    <div class="dasboard-widget-box   fl-wrap card-box">
                        <div class="custom-form add_room-item-wrap">
                            <div class="add_room-container fl-wrap">
                                <!-- add_room-item   -->
                                <div class="add_room-item fl-wrap" >
                                    <!-- <div align="left" :style="{'font-size': '15px', 'font-weight': 700, 'color': '#008BCF', opacity: 0.7}"><strong>Зураг (10-аас хэтрэхгүй)</strong></div> -->
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label :style="{'margin-bottom': '20px', 'line-height': '20px'}">Зураг (10-аас хэтрэхгүй) <br> Зөвхөн ( .JPG, .JPEG, .PNG ) өргөтгөлтэй файл.</label>
                                            <el-upload 
                                            @change="handleChange" 
                                            :action="$appUrl+'/props/upload-images'" 
                                            ref="uploadImage" 
                                            id="uploadImage" 
                                            multiple
                                            limit="10" 
                                            accept=".png, .jpg, .jpeg"
                                            list-type="picture-card" 
                                            :auto-upload="false"
                                            v-model:file-list="uploadImages"
                                            align="left">
                                            <i class="fa fa-plus"></i>

                                            <template #file="{ file }">
                                                <div>
                                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                                    <span class="el-upload-list__item-actions">
                                                    <span
                                                        v-if="!disabled"
                                                        class="el-upload-list__item-delete"
                                                        @click="handleRemove(file)"
                                                    >
                                                        <i class="fa fa-trash"></i>
                                                    </span>
                                                    </span>
                                                </div>
                                            </template>
                                        </el-upload>
                                        </div>
                                    </div>
                                </div>
                                <!--add_room-item end  -->
                            </div>
                        </div>
                    </div>
                    <div class="dasboard-widget-box fl-wrap card-box">
                        <div class="custom-form">
                            <div class="row">
                                <div class="col-md-12">
                                    <label :style="{'margin-bottom': '20px', 'line-height': '20px'}">Бичлэг</label>
                                    <el-input v-model="property.main.video" maxlength="100" class="w-50 m-2" size="large" placeholder="YOUTUBE URL" :prefix-icon="Search" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- dasboard-widget-box  end-->
                    <a href="javascript:;" @click="saveProperty" class="btn  color-bg float-btn" style="margin-bottom: 20px;">Хадгалах</a>
                </div>
            </div>
            <div class="limit-box fl-wrap"></div>			
            <el-dialog title="" v-model="modals.pricing" :width="resize + '%'">
                <div class="price-container">
                    <div class="price-col">
                        <div class="title">
                            <span>Энгийн</span>
                        </div>

                        <div class="price">
                            ₮0
                        </div>

                        <div class="list">
                            <tr>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                    </svg>
                                </td>
                                <td>
                                    Сайтад нийтлэгдэнэ
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                    </svg>
                                </td>
                                <td>
                                    Бүх хэрэглэгчдэд харагдана
                                </td>
                            </tr>
                        </div>
                        <button class="choose--btn" @click="chooseSpecial(1, 0)"> Сонгох </button>
                    </div>
                    <div class="price-col">
                        <div class="best-value">Best Value</div>
                        <div class="title">
                            <span>VIP</span>
                        </div>

                        <div class="price">
                            ₮30,000
                        </div>

                        <div class="list">
                            <tr>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                    </svg>
                                </td>
                                <td>
                                    Сайтад нийтлэгдэнэ
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                    </svg>
                                </td>
                                <td>
                                    Бүх хэрэглэгчдэд харагдана
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                    </svg>
                                </td>
                                <td>
                                    Жагсаалтын дээгүүр<br>эрэмблэгдэнэ
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                    </svg>
                                </td>
                                <td>
                                    Хэрэглэгч бүрт 1 удаа мэдэгдэл<br>очино
                                </td>
                            </tr>
                        </div>
                        <button class="choose--btn" @click="chooseSpecial(3, 30000)"> Сонгох </button>
                    </div>
                    <div class="price-col">
                        <div class="title">
                            <span>Special</span>
                        </div>

                        <div class="price">
                            ₮20,000
                        </div>

                        <div class="list">
                            <tr>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                    </svg>
                                </td>
                                <td>
                                    Сайтад нийтлэгдэнэ
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                    </svg>
                                </td>
                                <td>
                                    Бүх хэрэглэгчдэд харагдана
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                    </svg>
                                </td>
                                <td>
                                    Жагсаалтын дээгүүр<br>эрэмблэгдэнэ
                                </td>
                            </tr>
                        </div>
                        <button class="choose--btn" @click="chooseSpecial(2, 20000)"> Сонгох </button>
                    </div>
                </div>
            </el-dialog>
        </div>
</template>
<script>
let mapPath; var markers = [], geocoder; 
export default {
    data() {
        return {
            modals: {
                pricing: false,
                width: 50
            },
            settings: {
                types: [],
                sizes: [],
                intent: [],
                usage: [],
                city: [],
                district: [],
                map: null,
                mapCenter: { lat: 47.92590022074307, lng: 106.91634889218517 }
            },
            property: {
                main: {
                    title: '', 
                    types: '',
                    sizes: '',
                    intent: '',
                    usage: '',
                    price: '',
                    description: '',
                    video: '',
                    lizing: false,
                    special: 1,
                    paymentId: ''
                },
                location: {
                    city: '',
                    district: '',
                    polygons: []
                },
            },
            uploadImages: [],
            regex: {
                title: [ { required: true, message: 'Гарчиг оруулна уу', trigger: 'blur'} ],
                types: [ { required: true, message: 'Төрлөө сонгоно уу', trigger: 'blur'} ],
                sizes: [ { required: true, message: 'Хэмжээ сонгоно уу', trigger: 'blur' } ],
                intent: [ { required: true, message: 'Зориулалт оруулна уу', trigger: 'blur' } ],
                usage: [ { required: true, message: 'Ашиглалтын хэлбэр сонгоно уу', trigger: 'blur' } ],
                price: [ { required: true, pattern: /^\d+$/, message: 'Үнэ оруулна уу', trigger: 'blur' } ],
                description: [ { required: true, message: 'Зарын дэлгэрэнгүй оруулна уу', trigger: 'blur' } ]
            },
            regexAdress: {
                city: [ { required: true, message: 'Хот/Аймаш сонгоно уу', trigger: 'blur'} ],
                district: [ { required: true, message: 'Сум/Дүүрэг сонгоно уу', trigger: 'blur'} ],
            }
        }
    },
    async mounted() {
        this.getSettings();
        this.getCity();
        await this.initMap();
        this.getLatLng();
    },
    computed: {
        districts() {
            var dist = [];
            this.settings.district.forEach(element => {
                if(element.cityId == this.property.location.city) {
                    dist.push(element);
                }
            });
            return dist;
        },
        lizingText() {
            let txt = '';
            this.property.main.lizing ? txt = 'Байгаа' : txt =  'Байхгүй';
            return txt;
        },
        resize() {
            if (window.innerWidth >= 1920) {
                return 50;
            } else if(window.innerWidth <= 720) {
                return 70;
            } else {
               return 100 - window.innerWidth * 50 / 1920;
            }
        }
    },
    methods: {
        chooseSpecial(value, price) {
            this.property.main.special = value;
            const app = this;
            this.$confirm('Итгэлтэй байна уу?', 'Санамж', {
                confirmButtonText: 'Хадгалах',
                cancelButtonText: 'Болих',
                type: 'warning'
            }).then(() => {
                if (value === 1) {
                    this.submitProperty();  
                } else {
                    // eslint-disable-next-line no-undef
                    let payment = new Unipay();
                    payment.createWidget ({
                        publicKey : "adye0j6o7mmz6d" ,
                        sum : price,
                        desc : "тестийн өгөгдөл" ,
                        trace : "" ,
                        signature : "" ,
                    });

                    payment . success ( function ( params ) {
                        // app.$notify({
                        //     title: 'Амжилттай',
                        //     message: 'Таны зар бүртгэгдлээ админ зөвшөөртөл түр хүлээнэ үү',
                        //     type: 'success',
                        // })

                        app.property.main.paymentId = params.paymentId;
                        this.submitProperty();  
                        // console . log ( params ) ;
                        // {
                        // "paymentId": "0kq5jo5t5lh0ujynecjlbt14rt59zodub1",
                        // "sum": "500.00",
                        // "trace": "",
                        // "currency": "MNT"
                        // }
                    });
                }
            });
        },
        clearData() {
            this.property =  {
                main: {
                    title: '', 
                    types: '',
                    sizes: '',
                    intent: '',
                    usage: '',
                    price: '',
                    description: '',
                    video: ''
                },
                location: {
                    city: '',
                    district: '',
                    polygons: []
                }
            };

            this.uploadImages = [];
            this.removePoly();
        },
        handleChange(file) {
            var types = ["PNG", "JPG", "JPEG"];

            if (!types.includes(file.name.split('.').pop().toUpperCase())) {
                this.uploadImages.splice(this.uploadImages.length - 1, 1);
            }

            setTimeout(() => {
                var size = file.size / 1024;
                if(size > 500) {
                    this.$message({
                        showClose: true,
                        message: 'Oops, Maximum size 500KB.',
                        type: 'error'
                    });
                    this.uploadImages.splice(this.uploadImages.length - 1, 1);
                }
            }, 200);
        },
        handleRemove(file) {
            this.uploadImages.forEach((element, index) => {
                if(element.name == file.name && element.size == file.size) {
                    this.uploadImages.splice(index, 1);
                }
            });
        },
        submitProperty() {
            const formData = new FormData();
            this.uploadImages.forEach(element => {
                formData.append("images", element.raw, element.raw.name);
            });

            formData.append('data', JSON.stringify(this.property));
            this.$axios.post(`/props/upload-images`, 
                formData, { headers: {} }
            ).then(data => {
                if(data.data.result == 200) {
                    this.$notify({
                        title: 'Амжилттай',
                        message: 'Таны зар бүртгэгдлээ админ зөвшөөртөл түр хүлээнэ үү',
                        type: 'success',
                    })
                    this.modals.pricing = false;
                    this.clearData();
                }
            });
        },
        saveProperty() {
            let vChecked = false;
            if (this.property.main.video === '') {
                vChecked = true;
            } else {
                vChecked = this.property.main.video.includes('www.youtube.com/watch?v=');
            }
            
            if (vChecked) {
                this.$refs.propertyMain.validate((valid) => {
                this.$refs.propertyLocation.validate((validL) => {
                    if(valid && validL) {
                        if(this.uploadImages.length <= 0) {
                            this.$notify({
                                    title: 'Алдаа',
                                    message: 'Хамгийн багадаа 1 зураг оруулна',
                                    type: 'warning',
                                })
                        } else {
                            if(this.property.location.polygons.length >= 3) {
                                // this.submitProperty();
                                this.modals.pricing = true;
                            } else {
                                this.$notify({
                                    title: 'Алдаа',
                                    message: 'Газрын зураг дээр хамгийн багадаа 3 цэг байрлуулна уу',
                                    type: 'warning',
                                })
                            }
                        }
                    }
                    });
                });
            } else {
                this.$notify({
                    title: 'Алдаа',
                    message: 'Алдаатай Youtube url',
                    type: 'warning',
                })
            }
        },
        removePolyline(idx) {
            this.property.location.polygons.splice(idx, 1);
            this.removePoly();
            if(this.property.location.polygons.length > 2) {
                this.setPolygons();
            }

            markers.forEach(el => {
                el.setMap(null);
            });

            this.property.location.polygons.forEach((element, idx) => {
                this.setMarker(element, `${idx + 1}`);
            });
        },
        removePoly() {
            mapPath.setMap(null);
            // this.removePolyline();
        },
        async initMap() {
            // eslint-disable-next-line no-undef
            geocoder = new google.maps.Geocoder();
            // eslint-disable-next-line no-undef
            this.settings.map = new google.maps.Map(document.getElementById('map'), {
                center: this.settings.mapCenter,
                zoom: true,
                maxZoom: 20,
                minZoom: 3,
                // eslint-disable-next-line no-dupe-keys
                zoom: 14,
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true
            })
            this.setPolygons();
        },
        changedCity() {
            this.property.location.district = '';
            this.GeolocaderWithCity();
        },
        GeolocaderWithCity() {
            var map = this.settings.map, address = '';
            if(this.property.location.district != '') {
                this.settings.district.forEach(el => {
                    if(el.id == this.property.location.district) {
                        address = el.district + ',';
                    }
                });
                
                if(this.property.location.city != '') {
                    this.settings.city.forEach(el => {
                        if(el.id == this.property.location.city) {
                            address += el.cityname + ',';
                        }
                    });
                }
            } else {
                if(this.property.location.city != '') {
                    this.settings.city.forEach(el => {
                        if(el.id == this.property.location.city) {
                            address = el.cityname + ',';
                        }
                    });
                }
            }

            geocoder.geocode({'address': `${address} Mongolia`}, function(results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        },
        getLatLng() {
            // eslint-disable-next-line no-undef
            google.maps.event.addListener(this.settings.map, 'click', e => {
                if (this.property.location.polygons.length > 5) {
                    this.$notify({
                        title: 'Алдаа',
                        message: 'Хамгийн ихдээ 6 цэг оруулна',
                        type: 'warning',
                    })
                } else {
                    let lat = e.latLng.lat();
                    let lng = e.latLng.lng();
                    this.property.location.polygons.push({lat, lng});
                    this.setMarker({lat, lng}, `${this.property.location.polygons.length}`)
                    this.removePoly();
                    this.setPolygons();
                }
            })
        },
        setMarker(points, label) {
            // eslint-disable-next-line no-undef
            const marker = new google.maps.Marker({
                position: points,
                map: this.settings.map,
                label: {
                    text: label,
                    color: '#fff'
                }
            });
            markers.push(marker);
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
        setPolygons() {
            // eslint-disable-next-line no-undef
            mapPath = new google.maps.Polygon({
                paths: this.property.location.polygons,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });

            if(this.property.location.polygons.length > 2) {
                mapPath.setMap(this.settings.map);
            }
        },
        getSettings() {
            this.$axios({
				method: 'post',
				url: `/props/get-settings`,
				data: {}
			}).then(data => {
                this.settings.types = data.data.types;
                this.settings.sizes = data.data.sizes;
                this.settings.usage = data.data.usages;
                this.settings.intent = data.data.intents;
            });
        }
    }
}
</script>
<style scoped>
.card-box {
    background: #fff;
    padding: 25px;
    margin-top: 50px;
    box-shadow: 3px 3px #f2f2f2;
    border-radius: 10px;
}
.select-trigger .el-input {
    margin-bottom: 0px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

@media (max-width: 500px) {
    .cut-text { 
        text-overflow: ellipsis;
        overflow: hidden; 
        max-width: 60px;
        white-space: nowrap;
    }
}
</style>