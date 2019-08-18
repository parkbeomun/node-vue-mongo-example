<template>
  <div id="login">
    <div class="login-header">
<!--      <a href="#" class="header-logo">logo</a>-->
      <h1>Sign in VueApp</h1>
    </div>
    <div class="login-form">
      <form @submit.prevent="onSubmit(email,password)">
        <input
          type="email"
          v-model="email"
        />
        <input
          type="password"
          v-model="password"
        />
        <button type="submit" value="Login">로그인</button>
      </form>
      <a>회원가입</a>

      <a>찾기</a>
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
        alert('login : '+email + ',' + password)

        //LOGIN 액션 실행
        this.$store.dispatch('LOGIN', {email, password})
          .then(() => this.redirect)
          .catch(({message}) => this.msg = message)
      },

      redirect() {
        const {search} = window.location
        const tokens = search.replace(/^\?/, '').split('&')
        const {returnPath} = tokens.reduce((qs, tkn) => {
          const pair = tkn.split('=')
          qs[pair[0]] = decodeURIComponent(pari[1])
          return qs
        }, {})

        //리다이렉트 처리
        this.$router.push(returnPath)
      }
    },
    /*
    computed: mapState({
      errorMessage: state => state.login.errorMessage,
      isAuth: state => state.login.isAuth
    })
    */

  }
</script>
<style>
  #login {
    display: block;
    height: 100%;
    text-align: center;
    padding: 100px 0px;
    background-color: rgb(249, 249, 249);
  }
  .login-header > h1 {
    font-size: 24px;
    font-weight: 300; /* 폰트 굵기 */
    letter-spacing: -0.5px; /* 글자사이 간격 */
    padding: 20px;
  }
  .login-form {
    display: inline-block;
    width: 308px;
    height: 230px;
    border: 1px solid #ababab;
    background-color: white;
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
