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
        name: "Home"
    }
</script>

<style scoped>

</style>
