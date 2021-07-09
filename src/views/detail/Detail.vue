<template>
  <div id="main-detail">
    <detail-nav-bar/>
    <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam} from "../../network/detail";

  export default {
      name: "Detail",
      data() {
        return {
          idd: null,
          topImages: [],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {}
        }
      },
      components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        Scroll
      },
      created() {
        this.iid = this.$route.params.iid
        //得到详情页数据
        getDetail(this.iid).then(res => {
          const data = res.result
          console.log(data);
          //获取轮播图图片
          this.topImages = res.result.itemInfo.topImages
          //获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          //创建店铺信息
          this.shop = new Shop(data.shopInfo)
          //获取商品详细信息
          this.detailInfo = data.detailInfo
          //获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        })
      },
    methods: {
        imageLoad() {
          this.$refs.scroll.refresh()
        }
    }
  }
</script>

<style scoped>
  #main-detail {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
