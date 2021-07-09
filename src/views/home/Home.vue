<template>
    <div id="home" class="wrapper">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <teb-control class="teb-control" :titles="['流行','新款','精选']"
      @tebClick="tebClick" ref="tebControl1" v-show="isTabFixed"></teb-control>

      <scroll class="content" ref="scroll" :probe-type="3"
      @scrollClick="contentScroll"
      :pull-up-load="true" @pullingUp="pullingUp">
        <home-swiper :banners="banners" @swiperImgLoad = "swiperImgLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <teb-control :titles="['流行','新款','精选']" @tebClick="tebClick"
        ref="tebControl2"></teb-control>
        <goods-list :goods="showTeb"></goods-list>
      </scroll>

      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>

  import NavBar from "@/components/common/navbar/NavBar";
  import {getHomeMultidata, getHomeGoods} from "@/network/home";
  import HomeSwiper from "@/views/home/childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureView from "@/views/home/childComps/FeatureView";
  import TebControl from "@/components/content/TebControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/BackTop";

  export default {
      name: "Home",
      components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TebControl,
        GoodsList,
        Scroll,
        BackTop
      },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        offsetTop: 0,
        isTabFixed: false,
      }
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    mounted() {

      const refresh = this.debounce(this.$refs.scroll.refresh(), 500)
      this.$bus.$on('imgItemLoad', () =>{
        refresh
      })
    },

    computed: {
      showTeb () {
        return this.goods[this.currentType].list
      }
    },

    methods: {
      backClick () {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll (position) {
        this.isShowBackTop = (-position.y) > 1000

        this.isTabFixed = (-position.y) > this.offsetTop
      },
      pullingUp () {
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        this.offsetTop = this.$refs.tebControl2.$el.offsetTop
      },
      /**
       * 关于事件监听的方法
       */
      debounce(func, delay) {
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },
      /**
       * 关于tebControl的方法
       */
      tebClick (index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }
        this.$refs.tebControl1.currentIndex = index
        this.$refs.tebControl2.currentIndex = index
      },

      /**
       * 关于网络请求的方法
       */
      getHomeMultidata () {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }).catch(err => {
        console.log(err);
      })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page+1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
          this.$refs.scroll.refresh()
        })
      }
    }

  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1; */
  }

  .teb-control {
    position: relative;
    z-index: 1;
  }

  .content {
    /*height: 300px;*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
