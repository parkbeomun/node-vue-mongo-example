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
      <div class="a-group">
        <router-link class="a-group-link" to="/register">회원가입</router-link>
        <router-link class="a-group-link" to="/register">찾기</router-link>
      </div>
    </div>
    <div><p style="color: red;" >{{msg}}</p></div>
    <div class="login-footer">
      <div class="footer-sign-in">
        <button class='btn-social-login' style='background:#D93025' @click="onSocialLogin"><i class="xi-2x xi-google"></i></button>
        <button class='btn-social-login' style='background:#4267B2'><i class="xi-2x xi-facebook"></i></button>
<!--        <button class='btn-social-login' style='background:#55ACEE'><i class="xi-2x xi-twitter"></i></button>-->
<!--        <button class='btn-social-login' style='background:#24292E'><i class="xi-2x xi-github"></i></button>-->
<!--        <button class='btn-social-login' style='background:#1FC700'><i class="xi-2x xi-naver"></i></button>-->
        <button class='btn-social-login' style='background:#FFEB00'><i class="xi-2x xi-kakaotalk text-dark"></i></button>
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
      onSocialLogin () {

        //LOGIN 액션 실행
        this.$store.dispatch('KAKAO_LOGIN', {})
          .then(() => {

            this.$router.push({path:'/'})
          })
          .catch(({message}) => this.msg = "아이디 또는 비밀번호를 확인하세요")
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

  /*소셜로그인버튼*/
  .btn-social-login {
    transition: all .2s;
    outline: 0;
    border: 1px solid transparent;
    padding: .5rem !important;
    border-radius: 50%;
    color: #fff;
  }
  .btn-social-login:focus {
    box-shadow: 0 0 0 .2rem rgba(0,123,255,.25);
  }
  .text-dark { color: #343a40!important; }
</style>
