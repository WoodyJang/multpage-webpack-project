<template>
  <div id="app">
    <div id="nav">
      <p>ssss</p>
      <!-- <img :src="image" alt=""> -->
      <!-- <hello></hello> -->
        <h1>Page Foo</h1>

        <pre></pre>

        <p>
         <router-link :to="{name:'baz'}">goto /foo/baz</router-link>
        </p>
        <p>
        </p>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
// import img from '@/1.jpg'
// import Hello from '@/hello'
export default {
  components: {
    // Hello
  },
  data(){
    return {
      // image: img
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
