<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item, index) in titles"
             :key="index" class="titles-item"
             :class="{active: index === currentIndex}" @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
      name: "DetailNavBar",
      data() {
        return {
          titles: ['商品', '参数', '评论', '推荐'],
          currentIndex: 0
        }
      },
      components: {
        NavBar
      },
    methods: {
        itemClick(index) {
          this.currentIndex = index
        },
      backClick() {
          this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
    font-size: 13px;
  }

  .titles-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 12px;
  }
</style>
