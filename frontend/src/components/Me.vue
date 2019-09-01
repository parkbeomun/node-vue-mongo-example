<template>
    <div>
      <h1>ME</h1>
      <div>
        <label>User info:</label>
        <pre>{{email}}</pre>
        <pre>{{name}}</pre>
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
          .then((obj) => {
            console.log(obj.data.info)
             let userinfo = obj.data.info
            //
             this.name = userinfo.name
             this.email = userinfo.email
            // this.accessLog = data.accessLog
          })
          .catch((error) => {
            console.log(error)
          })
      },
      name: "Me",
      data () {
        return {
          baseURI : "/api/auth",
          name: '',
          email: '',
          accessLog: []
        }
      }
    }
</script>

<style scoped>

</style>
