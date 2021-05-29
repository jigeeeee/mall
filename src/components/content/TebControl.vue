<template>
    <div class="teb-control">
      <div class="teb-control-item" v-for="(item, index) in titles" :key="index" :class="{active: index === currentIndex}" @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "TebControl",
      props: {
        titles: {
          type: Array,
          default() {
            return []
          }
        }
      },
      data() {
        return {
          currentIndex: 0
        }
      },
      methods: {
        itemClick(index) {
          this.currentIndex = index;
          this.$emit('tebClick', index)
        }
      }
    }
</script>

<style scoped>
  .teb-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .teb-control-item {
    flex: 1;
  }

  .teb-control-item span {
    padding: 5px;

  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
