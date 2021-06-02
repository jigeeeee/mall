<template>
  <detial-nav-bar>
    <div>详情页</div>
  </detial-nav-bar>
</template>

<script>
  import "./childComponents/DetialNavBar.vue"
  export default {
      name: "Detial",
      data() {
        return {
          idd: null
        }
      },
      components: {
        DetialNavBar,
      },
      created() {
        this.iid = this.$route.params.iid
      }
  }
</script>

<style scoped>

</style>