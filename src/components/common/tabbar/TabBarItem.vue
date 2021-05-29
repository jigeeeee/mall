<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon-active"></slot></div>
        <div v-else><slot name="item-icon"></slot></div>
        <div :class="{active:!isActive}"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
          path:String
        },
        data () {
            return {}
        },
        computed: {
          isActive () {
              return this.$route.path.indexOf(this.path)
          }
        },
        methods:{
            itemClick () {
                this.$router.push(this.path).catch((err)=>(err))
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }

    .tab-bar-item img {
        width: 25px;
        height: 25px;
        margin-top: 3px;
        margin-bottom: 2px;
        vertical-align: middle;
    }

    .active {
        color: hotpink;
    }
</style>
