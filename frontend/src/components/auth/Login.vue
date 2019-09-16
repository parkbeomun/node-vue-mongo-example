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
        </div>render
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
        <button class='btn-social-login' style='background:#D93025'><i class="xi-2x xi-google"></i></button>
<!--        <button class='btn-social-login' style='background:#4267B2'><i class="xi-2x xi-facebook"></i></button>-->
<!--        <button class='btn-social-login' style='background:#55ACEE'><i class="xi-2x xi-twitter"></i></button>-->
<!--        <button class='btn-social-login' style='background:#24292E'><i class="xi-2x xi-github"></i></button>-->
<!--        <button class='btn-social-login' style='background:#1FC700' @click="onNaverLogin"><i class="xi-2x xi-naver"></i></button>-->
        <div>
        </div>
        <a :href="naverLoginUrl"><button class='btn-social-login' style='background:#1FC700'><i class="xi-2x xi-naver"></i></button></a>
        <button class='btn-social-login' style='background:#FFEB00' @click="onKakaoLogin"><i class="xi-2x xi-kakaotalk text-dark"></i></button>
      </div>
    </div>
  </div>
</template>
<script>

  import socialLogin from './socialLogin'
  // import { mapActions, mapState } from 'vuex'
  /* login */
  export default {
    data () {
      return {
        baseURI : "/api/auth",
        valid: true,
        email: '',
        password: '',
        msg: '',
        login_data : [{
          access_token : 'zz',
          refrash_token: 'zzz',
          nikname: 'zzzz',
        }],
        test: 'test',
        naverLoginUrl: 'https://nid.naver.com/oauth2.0/authorize?' +
          'response_type=' +
          'code&client_id=fjkwOaQsH3_sIfgQ1aZK' +
          '&redirect_uri=http://127.0.0.1:3000/login/naver/callback' +
          '&state=RAMDOM_STATE',
        client_id: "fjkwOaQsH3_sIfgQ1aZK",
        redirect_uri: "http://127.0.0.1:3000",
        state: "RAMDOM_STATE",
      }
    },

    mounted() {
      Kakao.init('fccf32c070c010a9d5fb15cfc1ab9370')
      //
      // console.log(this.naverLoginUrl)
      // console.log(this.client_id)
      // console.log(this.redirect_uri)
      // console.log(this.state)
      //
      //
      // this.naverLoginUrl =+ "&client_id="+ String(this.client_id)
      // this.naverLoginUrl =+ "&redirect_uri="+ String(this.redirect_uri)
      // this.naverLoginUrl =+ "&state="+ String(this.state)

      console.log(this.naverLoginUrl)


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
          .catch(({message}) => this.msg = "아이디 또는 비밀번호를 확인하세요")
      },


      onKakaoLogin () {

        socialLogin.kakaoLogin()
          .then( result => {
            console.log('result : '+JSON.stringify(result.authObj))
            console.log('result2 : '+JSON.stringify(result.res))

            const access_token = result.authObj.access_token
            const refresh_token = result.authObj.refresh_token
            const token_type = result.authObj.token_type
            const id = result.res.id;
            const name = result.res.properties.nickname;
            const nickname = result.res.properties.nickname;
            const email = ''

            console.log('id:'+id)

            this.$http.post(`${this.baseURI}/kakao/register`, {
              id,
              name,
              nickname,
              email,
              access_token
            }).then( (response) => {
              var data = {
                access_token,
                refresh_token,
                token_type,
                name : nickname
              }

              this.$store.commit('SOCIAL_LOGIN', {data})
              this.$router.push({path:'/'})
            })
          })

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
