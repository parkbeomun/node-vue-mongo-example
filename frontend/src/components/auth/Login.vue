<template>
  <div id="login">
    <div class="login-header">
<!--      <a href="#" class="header-logo">logo</a>-->
      <h1>로그인</h1>
    </div>
    <div class="login-form">
      <form @submit.prevent="onSubmit(email,password)">
        <div class="form-group">
          <label class="form-label">email : </label>
          <input class="form-input" type="email" v-model="email" />
        </div>
        <div class="form-group">
          <label class="form-label">password : </label>
          <input class="form-input" type="password" v-model="password" />
        </div>
        <br>
        <button type="submit" value="Login">로그인</button>
      </form>
      <p>{{msg}}</p>
      <div class="a-group">
        <router-link class="a-group-link" to="/register">회원가입</router-link>
        <router-link class="a-group-link" to="/register">찾기</router-link>
      </div>
    </div>
    <div class="login-footer">
      <div class="footer-sign-in">
        New to Vana Blog? <a href="#">Create an account.</a>
      </div>
    </div>
  </div>

</template>
<script>
  // import { mapActions, mapState } from 'vuex'
  /* login */
  export default {
    data () {
      return {
        valid: true,
        email: '',
        password: '',
        msg: ''
      }
    },
    methods: {
      // ...mapActions('login', ['login']),
      /*
      async submit () {
        try {
          let loginResult = await this.login({email: this.id, password: this.password})
          console.log(loginResult) // 로그인 성공하면 true, 아니면 false
          if (loginResult) {
            this.$router.push('/')
          } else {
            alert(this.errorMessage)
          }
        } catch (err) {
          console.error(err)
        }
      },
      */
      onSubmit (email, password) {

        //LOGIN 액션 실행
        this.$store.dispatch('LOGIN', {email, password})
          .then(() => {

            this.$router.push({path:'/'})
          })
          .catch(({message}) => this.msg = message)
      },

    },
    /*
    computed: mapState({
      errorMessage: state => state.login.errorMessage,
      isAuth: state => state.login.isAuth
    })
    */

  }
</script>
<style scoped>

  .login-header > h1 {
    font-size: 24px;
    font-weight: 300; /* 폰트 굵기 */
    letter-spacing: -0.5px; /* 글자사이 간격 */
    padding: 20px;
    font: bold 24px Dotum;
    color: #4e555b;
  }
  .login-form {
    display: inline-block;
    width: 378px;
    height: 380px;
    padding: 24px;
    border: 1px solid #ababab;
    background-color: white;
  }
  .form-group {
    padding-top: 15px;
    margin-bottom: 15px;
    width: 73px;
    hegith: 20px;
  }
  .form-label {
    width:100px;
    font: bold 15px Dotum;
    text-align:left
  }
  .form-input {
    margin-top: 5px;
    width: 300px;
  }
  .a-group {
    margin-top: 30px;
  }
  .a-group > .a-group-link {
    margin: 5px;
  }
  .login-footer {
    padding: 20px;
  }
  .footer-sign-in {
    display: inline-block;
    width: 308px;
    padding: 20px;
    border: 0.5px solid #ababab;
  }
</style>
