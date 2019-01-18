<template>
  <div id="app">
    1111111111111111
  </div>
</template>
<script>
import img from '@/1.jpg'
import Hello from '@/hello'
export default {
  components: {
    Hello
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
