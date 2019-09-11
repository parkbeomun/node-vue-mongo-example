<template>
  <div>
    <h1>메인 페이지입니다. 메뉴를 선택하세요</h1>
  </div>

</template>

<script>
    export default {
        created() {
          this.$http.get('/home')
            .then(result => this.greeting = result.data.greeting)
        },
      mounted () {
        //http://127.0.0.1:3000/?code=LvHrFX5dtPrCrUUk4q&state=#/
        // const url = window.location.href
        // const param = url.split('?')[1].split('&')
        // console.log('param :'+param)
        // if(param != null && param != '') {
        //   const code = param[0].split('=')[1]
        //   const  state = param[1].split('=')[1]
        //   console.log('code :'+code)
        //   console.log('state :'+state)
        // }




      },
        name: "Home"
    }
</script>

<style scoped>

</style>
