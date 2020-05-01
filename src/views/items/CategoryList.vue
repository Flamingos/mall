<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="white"
      @search="onSearch"
      placeholder="请输入搜索关键词"
    ></van-search>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <van-sidebar v-model="activeKey" style="width:100%;">
              <van-sidebar-item
                @click="clickCategory(index,item.ID)"
                v-for="(item,index) in category"
                :key="index"
                :title="item.MALL_CATEGORY_NAME"
              />
            </van-sidebar>
          </div>
        </van-col>
        <van-col span="18" class="right">
          <div class="banner-pic">
            <img class="pic" :src="image" />
          </div>
          <van-divider>分类</van-divider>
          <van-grid :column-num="3">
            <van-grid-item
              v-for="(item, index) in categorySub"
              :key="index"
              @click="goToList(item.ID,item.MALL_SUB_NAME)"
              :text="item.MALL_SUB_NAME"
            >
              <img class="smallpic" :src="image" />
              <span class="title">{{item.MALL_SUB_NAME}}</span>
            </van-grid-item>
          </van-grid>

          <!--van-panel-- class="panel" :title="item.MALL_SUB_NAME" v-for="(item, index) in categorySub" :key="index" @click="goToList(item.ID)"></!--van-panel-->
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getCategory, getCategorySub } from '@/api/api.js'
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0, //反白效果
      categorySub: [],
      image: "",
      value: "",
      activeKey: 0
    };
  },
  methods: {
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      getCategorySub({id:categoryId}).then(res=>{
        this.categorySub = res.data.data
      })
    },
    goToList(id,title) {
      let cateDetail = {subId: id, title: title}
      sessionStorage.cateDetail = JSON.stringify(cateDetail)
      this.$router.push({ name: "GoodsList", params: cateDetail });
    },
    onSearch(val) {
      this.$router.push({ name: "SearchGoodsList", params: {str:val} });
    }
  },
  created() {
    getCategory().then(res=>{
      this.category = res.data.RECORDS
    })
    //数据伪造
    let Random = this.$mock.Random;
    this.image = Random.image("600x600");
  },
  watch:{
    category:function(){
      this.clickCategory(0, this.category[0].ID);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.navbar-div {
  height: 2.4rem;
  background: #4fc08d;
  color: white;
  line-height: 2.4rem;
}
.right {
  background: white;
  height: calc(100vh - 5rem);
  overflow: scroll;
}
#leftNav {
  background: rgb(249,249,249);
  height: calc(100vh - 5rem);
  overflow: scroll;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #4fc08d;
  color: white;
}
.panel {
  padding: 5px;
  margin: 8px;
  background: white;
  border-radius: 5px;
}
.banner-pic {
  width: 100%;
  height: 5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
}
.pic {
  width: 100%;
  height: 5rem;
}
.smallpic {
  width: 100%;
  height: 3rem;
}
.title {
  font-size: 0.5rem;
  margin-top: 10px;
  color: rgb(94, 94, 94);
}
</style>