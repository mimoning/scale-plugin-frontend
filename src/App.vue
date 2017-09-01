<template>
  <div id="app">
    <router-view></router-view>
    <loading ></loading>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
  @import '~@/assets/common.scss';
</style>

