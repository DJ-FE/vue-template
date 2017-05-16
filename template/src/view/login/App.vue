<template>
    <div id="app">
        login
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
        console.log('login')
        // this.$http.post('/api/sales/checkEnter', {
        //     cityId: 1,
        //     activityType: 1,
        //     activityId: 1,
        //     goodsId: 1,
        //     serviceId: 1
        // }).then(response => {
        //     let json = response.body
        //     console.log(json)
        // })
        // this.$http.get('/api/sales/getSalesList?cityId=1').then(response => {
        //     let json = response.body
        //     console.log(json)
        // })
    },
    components: {
    }
}
</script>
<style scoped lang="scss">

</style>
