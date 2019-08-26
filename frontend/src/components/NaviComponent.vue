<template>
    <div class="nav-group-all">
      <h3 class="logo">LOGO</h3>
      <div class="nav-menu">
        <router-link class="nav" to="/">Go to Home</router-link>
        <router-link class="nav" to="/post">게시글</router-link>
        <router-link class="nav" to="/todo">할일목록</router-link>
        <router-link class="nav" to="/sample">API 호출 테스트</router-link>
      </div>
      <div class="nav-group-right">
        <div v-if="auth">
          <div class="nav">안녕하세요 {{username}} 님</div>
          <router-link class="nav" to="/me">마이페이지</router-link>
          <router-link class="nav" to="/logout">로그아웃</router-link>
        </div>
        <div v-else>
          <router-link  class="nav" to="/register">회원가입</router-link>
          <router-link class="nav" to="/login">로그인</router-link>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
        name: "NaviComponent",
        data: function(){
          return {

          }
        },

        methods: {
          logout: () => {
            this.$store.dispatch('LOGOUT')
            //this.$store.dispatch('LOGIN', {email, password})
            this.$router.push({path:'/login'})
          }

        },

       computed: {
          ...mapGetters({
            auth: 'isAuthenticated',
            username: 'getUserName'
          })
       }
    }
</script>

<style scoped>
  .nav-group-all {
    float: left;
    taxt-align: center;
    width: 100%;
  }
  .nav-group-all > .logo{
    padding-top: 10px;
    float: left;
    width: 150px;
  }
  .nav-menu {
    padding-top: 10px;
    padding-left: 20px;
    width: 500px;
    float: left;
  }
  .nav-group-right {
    padding-top: 10px;
    float: right;
    width: 500px;
  }
  .nav-group-right > p {
    width: 50px;
  }
  .nav {

    display:inline;
    border-left: 1px solid #4e555b;
    font: bold 12px Dotum;
    color: white;
    padding: 0 10px;
  }


</style>
