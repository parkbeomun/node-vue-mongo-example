<template>
    <div>
      <h1>ME</h1>
      <div>
        <label>User info:</label>
        <pre>{{user}}</pre>
      </div>
      <div>
        <label>Access Log:</label>
        <div v-for="log in accessLog">{{log.createAt}}</div>
      </div>
    </div>
</template>

<script>

    export default {
      created () {
        this.$http.get(`${this.baseURI}me`)
          .then((data) => {
            this.user = data.user
            this.accessLog = data.accessLog
          })
          .catch((error) => {
            console.log(error)
          })
      },
      name: "Me",
      data () {
        return {
          baseURI : "/api/auth",
          user: '',
          accessLog: []
        }
      }
    }
</script>

<style scoped>

</style>
