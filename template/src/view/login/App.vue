<template>
  <div id="app">
    <h1 class="red">
      hello world!
    </h1>
    <div><img src="../../assets/logo.png" alt=""></div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    console.log('login')
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
#app{text-align: center;}
h1{
  font-size:40px;
  text-align:center;
  img{
      width:50%;
  }
}
</style>
