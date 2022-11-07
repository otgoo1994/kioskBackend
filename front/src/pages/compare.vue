<style lang="scss" scoped>
.compare-slider {
  display: flex;
  overflow-x: auto;
  user-select: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 5px;
    }

  .compare-content {
    li {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}

</style>
<template>
  <div class="content">
    <section class="gray-bg small-padding" v-if="compare.length > 0">
      <div class="container">
          <div class="compare-container fl-wrap">
              <div class="compare-counter"><span>{{compare.length}}</span> Option</div>
              <div class="compare-header">
                  <ul>
                      <li>Үнэ</li>
                      <li>Хот / Аймаг</li>
                      <li>Дүүрэг / Сум</li>
                      <li>Лизинг</li>
                      <li>Талбай</li>
                      <li>Төрөл</li>
                      <li>Зориулалт</li>
                      <li>Ашиглалт</li>
                  </ul>
              </div>
              <div class="compare-slider fl-wrap">
                  <div class="slick-slide-item" v-for="(item, index) in compare" :key="index">
                      <div class="compare-column">
                          <div class="compare-link fl-wrap" style="flex-direction: column;display: flex;align-items: center;">
                              <div class="compare-link-meia fl-wrap">
                                  <div class="bg par-elem">
                                    <img :src="$appUrl + '/images/property/' + item.imagename" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                                  </div>
                                  <div @click="remove(item.propertyId)" class="remove-compare color-bg"><i class="fal fa-times"></i></div>
                              </div>
                              <h4><router-link :to="'/single/' + item.propertyId">{{item.title}}</router-link></h4>
                          </div>
                          <div class="compare-content">
                              <ul>
                                  <li>₮ {{item.price}} САЯ</li>
                                  <li>{{getCityname(item.city)}}</li>
                                  <li>{{getDistrict(item.district)}}</li>
                                  <li>
                                    <el-tag style="margin:0;" size="small" class="ml-2" :type="item.lizing ? 'success' : 'warning'">{{item.lizing ? 'Лизингтэй' : 'Лизинггүй'}}</el-tag>
                                  </li>
                                  <li>{{getType('sizes', item.sizes)}}</li>
                                  <li>{{getType('types', item.types)}}</li>
                                  <li>{{getType('intent', item.intent)}}</li>
                                  <li>{{getType('usage', item.usage)}}</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
  <section style="height: 100vh;" v-else>
    <h1 style="margin-top: 10vh;">Харьцуулах бүтээгдэхүүн байхгүй байна.</h1>
    <router-link to="/" class="btn color-bg" style="display: block; margin-top: 30px; width: 300px;left: 50%;transform: translateX(-50%)">Нүүр хуудас руу буцах</router-link>
  </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        types: [],
        sizes: [],
        usage: [],
        intent: []
      },
      compare: [],
      city: [],
      district: []
    }
  },
  created() {
    this.getSettings();
    this.getCity();
    this.getCompareProps();
  },
  methods: {
    remove(id) {
      this.$emit('removeCompare', id);
      this.compare.forEach((elm, index) => {
        elm.propertyId == id ? this.compare.splice(index, 1) : null;
      });
    },
    getType(key, value) {
      const obj = this.settings[key];
      if (!obj) {
        return;
      }
      
      let name = '';
      obj.forEach(elm => {
        elm.id == value ? name = (
          key == 'sizes' ? elm.size
          : (
            key == 'types' ? elm.typename
            : (
              key == 'usage' ? elm.usename
              : elm.intent
            )
          )
        ) : null; 
      });
      return name;
    },
    getCity() {
      this.$axios({
        method: 'post',
        url: `/props/get-city`,
        data: {}
      }).then(data => {
        this.city = data.data.city;
        this.district = data.data.district;
      });
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
    getCompareProps() {
      const compare = JSON.parse(localStorage.getItem('compare'));
      if (!compare) {
          return;
      }

      console.log(this.compare);
      this.compare = compare;
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