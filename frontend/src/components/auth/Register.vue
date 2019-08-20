<template>
  <div id="login">
    <div class="login-header">
      <!--      <a href="#" class="header-logo">logo</a>-->
      <h1>회원가입</h1>
    </div>
    <div class="login-form">
      <form @submit.prevent="onSubmit(email,password,name)">
        <div class="form-group">
          <label class="form-label">이메일 : </label>
          <input class="form-input" type="email" v-model="email" />
        </div>
        <div class="form-group">
          <label class="form-label">비밀번호 : 5자이상 10자이하</label>
          <input class="form-input" type="password" v-model="password" />
        </div>
        <div class="form-group">
          <label class="form-label">이름 : </label>
          <input class="form-input" type="text" v-model="name" />
        </div>
        <br>
        <button type="submit" value="Login">회원가입</button>
      </form>
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
        baseURI : "/api/auth",
        valid: true,
        email: '',
        password: '',
        passwordChk: '',
        name: '',
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
      onSubmit (email, password, name) {

        if(password.length < 5 || password.length > 10){
          alert("비밀번호를 확인하세요");
          return;
        }
        if(name.trim() < 1){
          alert("이름을 입력하세요");
          return;
        }

        //REGISTER 액션 실행
        this.$http.post(`${this.baseURI}/register`, {email, password, name})
          .then((respond) => {
            alert("회원가입 완료")
            this.$router.push(`/login`)
          })
          .catch((err) => {alert(err)})
      },

    },

    computed: {

    }


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
    height: 400px;
    padding: 24px;
    border: 1px solid #ababab;
    background-color: white;
  }
  .form-group {
    padding-top: 13px;
    margin-bottom: 10px;
    width: 73px;
    hegith: 20px;
  }
  .form-label {
    width: 250px;
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
