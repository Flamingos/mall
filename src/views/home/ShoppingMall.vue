<template>
  <div>
    <!--search bar layout-->
    <van-sticky>
      <div class="search-bar">
        <van-row>
          <!--van-col-- span="3">
          <img :src="locationIcon" width="70%" class="location-icon" />
          </!--van-col-->
          <van-col span="24">
            <van-search
              v-model="value"
              shape="round"
              background="white"
              @search="onSearch"
              placeholder="请输入搜索关键词"
            ></van-search>
          </van-col>
          <!--van-col-- span="5">
          <van-button size="mini">查找</van-button>
          </!--van-col-->
        </van-row>
      </div>
    </van-sticky>
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--category area-->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="100%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--ad banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" />
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price|moneyFilter}} (￥{{item.mallPrice|moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--floor-->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import { getHome } from "@/api/api.js";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "@/components/floorComponent.vue";
import { toMoney } from "@/filter/moneyFilter.js";
import goodsInfo from "../components/goodsInfoComponent";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      value: "",
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("../assets/images/location.png"),
      bannerPicArray: [], //轮播图
      category: [], //类别
      adBanner: "", //广告
      recommendGoods: [], //商品推荐
      floor1: [], //楼层数据
      floor2: [],
      floor3: [],
      floorName: {}, //楼层名称
      hotGoods: [] //热卖商品
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    onSearch(val) {
      this.$router.push({ name: "SearchGoodsList", params: {str:val} });
    }
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  created() {
    getHome().then(res => {
      this.category = res.data.data.category;
      this.adBanner = res.data.data.advertesPicture;
      this.bannerPicArray = res.data.data.slides;
      this.recommendGoods = res.data.data.recommend;
      this.floor1 = res.data.data.floor1;
      this.floor2 = res.data.data.floor2;
      this.floor3 = res.data.data.floor3;
      this.floorName = res.data.data.floorName;
      this.hotGoods = res.data.data.hotGoods;
    }).catch(e=>{
      console.log('error',e)
    });
  }
};
</script>

<style>
.search-bar {
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #d82186;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  clear: both;
  max-height: 10rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.type-bar img {
  width: 3rem;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #4fc08d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>