<template>
  <div >
    <div class="main-div">
      <keep-alive>
        <router-view @goods-count="getGoodsCount" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view @goods-count="getGoodsCount" v-if="!$route.meta.keepAlive" />
    </div>
    <van-tabbar
      active-color="#07c160"
      inactive-color="#000"
      v-model="active"
      @change="changeTabbar(active)"
      class="tabbar"
    >
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">分类</van-tabbar-item>
      <van-tabbar-item icon="cart" :info="goodsCount">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: "", //当前路径
      goodsCount: ''
    };
  },
  created() {
    this.changeTabBarActive();
    this.init()
  },
  updated() {
    this.changeTabBarActive();
  },
  computed:{},
  methods: {
    init(){
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let count = 0;
      for(let item of cartInfo){
        count += item.count
      }
      this.goodsCount = count;
    },
    //从子组件获取商品总数
    getGoodsCount(data){
      this.goodsCount = data
    },
    changeTabBarActive() {
      this.nowPath = this.$route.path;
      if (this.nowPath == "/mall") {
        this.active = 0;
      }else if (this.nowPath == "/categorylist") {
        this.active = 1;
      }else if (this.nowPath == "/cart") {
        this.active = 2;
      }else if (this.nowPath == "/member") {
        this.active = 3;
      }
    },
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "ShoppingMall" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          this.$router.push({ name: "Member" });
          break;
      }
    }
  }
};
</script>

<style scoped>
.tabbar{
  height: 2.6rem;
}
</style>