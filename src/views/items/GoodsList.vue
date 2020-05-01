<template>
  <div>
    <van-nav-bar
      class="nav-bar"
      fixed
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :title="title"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <div class="goodslist">
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list :immediate-check='false' v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-card
            @click="goGoodsInfo(item.ID)"
            v-for="(item,index) in goodList"
            :key="index"
            :price="item.ORI_PRICE | moneyFilter "
            desc="描述信息"
            :title="item.NAME"
            :thumb="item.IMAGE1"
          >
            <div slot="tags">
              <van-tag plain type="danger">标签</van-tag>
              <van-tag plain type="danger">标签</van-tag>
            </div>
          </van-card>
          
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getGoods } from '@/api/api.js'
import goods from "@/json/goods.json";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      loading: false, //上拉加载
      finished: false, //上拉加载是否无数据
      isRefresh: false, //下拉加载
      page: 1, //商品列表的页数
      goodList: [], //商品信息
      categorySubId: "", //商品子分类ID
      total: 0, //记录遍历到哪一个位置
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"',
      title: ''
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created(){
    //this.title = this.$route.params.title // /? this.$route.params.title : JSON.parse(sessionStorage.cateDetail).title;
  },
  activated(){
    this.title = this.$route.params.title || ''
    if(this.$route.params.subId){
      this.goodList = []
      this.onLoad()
    }
  },
  deactivated(){
    
  },
  methods: {
    onClickLeft() {
      //this.$toast("返回");
      this.$router.go(-1);
    },
    onClickRight() {
      this.$toast("按钮");
    },
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    },
    onLoad() {
      //用于加载
      setTimeout(() => {
        this.categorySubId = this.$route.params.subId ? this.$route.params.subId : JSON.parse(sessionStorage.cateDetail).subId;
        const num = 4;
        const goodsArr = [...goods].slice(this.total);
        for (let i = 0; i < goodsArr.length; i++) {
          if (goodsArr[i].SUB_ID == this.categorySubId) {
            this.goodList.push(goodsArr[i]);
          }
          if (this.goodList.length == num * this.page) {
            this.total += i + 1;
            break;
          }
        }
        this.loading = false;
        if (this.goodList.length < num * this.page) {
          this.finished = true;
        }
        this.page++;
      }, 1000);
    },
    onRefresh() {
      //用于上拉刷新数据
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.loading = true;
        this.page = 1;
        this.total = 0;
        this.goodList = [];
        this.onLoad();
      }, 500);
    }
  }
};
</script>

<style scoped>
.nav-bar {
  height: 2.5rem;
}
.goodslist {
  margin-top: 2.5rem;
}
.list-item {
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
</style>