import axios from 'axios'

/* Kakao Login Javascript Jdk  */
function kakaoLogin () {

  return new Promise((resolve, reject) => {
      Kakao.Auth.login({
        success: function (authObj) {
          //console.log(JSON.stringify(authObj));
          Kakao.API.request({
            url: '/v2/user/me',
            success: function (res) {
              resolve({authObj,res})
            },
            fail: function (error) {
              //console.log(JSON.stringify(error));
              reject(error)
            }
          }).then((res) => {

          })
        },
        fail: function (err) {
          //alert(JSON.stringify(err));
          reject(err)
        }
      }) //end Kakao.Auth.login
    }
  ) //end promise
}


export default {kakaoLogin}
