<template>
    
</template>

<script>
    export default {
        created (){
          this.$store.dispatch('LOGOUT')
          this.$router.push({path:'/login'})
        },
        name: "Logout"
    }
</script>

<style scoped>

</style>
