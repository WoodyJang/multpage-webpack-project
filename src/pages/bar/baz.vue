<template>
  <div id="app">
    1111111111111111
  </div>
</template>
<script>
import img from '@/1.jpg'
export default {
  components: {
    Hello: () => import('@/hello')
  },
  data(){
    return {
      image: img
    }
  }
}
</script>
<style lang="scss" scoped>
#app{
  width: 100%;
  display: flex;
  #nav{
    // height: 100px;
    width: 100%;
  }
}
</style>
