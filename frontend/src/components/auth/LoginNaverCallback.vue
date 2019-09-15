<template>
  <div>
    callback 처리중입니다. 이 페이지에서는 callback을 처리하고 바로 main으로 redirect하기때문에 이 메시지가 보이면 안됩니다.
    <div>code : {{code}}</div>
    <div>state: {{state}}</div>
  </div>
</template>

<script>
    export default {
        name: "LoginNaverCallback",
        data () {
          return {
            baseURI : "/api/auth",
            code: '',
            state: '',
          }
        },
        mounted () {

          const url = window.location.href
          if(url.indexOf('?')) {
            const param = url.split('?')[1].split('&')

            if(param != null && param != '') {
              this.code = param[0].split('=')[1]
              this.state = param[1].split('=')[1]

              this.$http.get(`${this.baseURI}/naver/callback`, {
                params: {
                  code: this.code,
                  state: this.state
                }
              }).then( (response) => {
                var data = response['data']
                var access_token = data['access_token']
                var refresh_token = data['refresh_token']
                var token_type = data['token_type']

                this.$http.post(`${this.baseURI}/naver/me`, {
                  access_token,
                  refresh_token,
                  token_type
                }).then( (response) => {

                  var me = response.data.response
                  var name = me['name']

                  var data = {
                    access_token,
                    refresh_token,
                    token_type,
                    name
                  }

                  this.$store.commit('SOCIAL_LOGIN', {data})
                  this.$router.push({path:'/'})
                })

              })
            }
          }
        },

    }
</script>

<style scoped>

</style>
