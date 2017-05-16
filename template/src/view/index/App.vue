<template>
    <div id="app">
        <h1 class="red">
            hello world!
        </h1>
        <div><img src="../../assets/logo.png" alt=""></div>
        <div class="icons">
            <div class="a1"></div>
            <div class="a2"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app',
    data () {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
    created() {
        this.$http.post('/api/sales/checkEnter', {
            cityId: 1,
            activityType: 1,
            activityId: 1,
            goodsId: 1,
            serviceId: 1
        }).then(response => {
            let json = response.body
            console.log('mock test', json)
        })
        this.$http.get('/api/sales/getSalesList?cityId=1').then(response => {
            let json = response.body
            console.log('mock test', json)
        })
    },
    components: {
    }
}
</script>
<style scoped lang="scss">
@import "../../style/sprite/sprite.scss";
#app{text-align: center;}
h1{
    font-size:40px;
    text-align:center;
    img{
        width:50%;
    }
}
.icons{
    display: flex;
    justify-content:center;
    flex-direction:row  ;
}
.icons div{margin:0 5px;}
.a1{
    @include sprite($qzone);
    background-size:cover;
    
}
.a2{
    @include sprite($weibo);
    background-size:cover;
}
</style>
