<template>
    <div>
      <h1>ME</h1>
      <div>
        <label>User info:</label>
        <pre>{{email}}</pre>
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
        this.$http.get(`${this.baseURI}/me`)
          .then((data) => {
            console.log(data)
            let userinfo = data.info

            this.user = userinfo.name
            this.email = userinfo.email
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
          email: '',
          accessLog: []
        }
      }
    }
</script>

<style scoped>

</style>
