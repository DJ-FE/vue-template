<template>
  <div id="app">
    <h1 class="red">
      hello world!
    </h1>
    <div><img src="./assets/logo.png" alt=""></div>
    <div class="icon1"></div>
  </div>
</template>
<script>
import API from './service/API.js'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    let api = API.TEST
    this.$http.post(api, { id: 1 }).then(response => {
      let json = response.body
      console.log('mock test', json)
    })
    // this.$http.get('/api/test1').then(response => {
    //     let json = response.body
    //     console.log('mock test1', json)
    // })
  },
  components: {}
}
</script>
<style scoped lang="scss">
@import './style/sprite/sprite.scss';
#app{text-align: center;}
h1{
  font-size:40px;
  text-align:center;
  img{
    width:50%;
  }
}
.icon1{
  @include sprite($qzone)
}
</style>
