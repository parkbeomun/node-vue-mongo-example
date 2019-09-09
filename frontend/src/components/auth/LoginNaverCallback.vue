<template>
  <div>
    callback 처리중입니다. 이 페이지에서는 callback을 처리하고 바로 main으로 redirect하기때문에 이 메시지가 보이면 안됩니다.
  </div>
</template>

<script>
    export default {
        name: "LoginNaverCallback",
        mounted () {
          var naver_id_login = new naver_id_login("YOUR_CLIENT_ID", "YOUR_CALLBACK_URL");
          // 접근 토큰 값 출력
          alert(naver_id_login.oauthParams.access_token);
          // 네이버 사용자 프로필 조회
          naver_id_login.get_naver_userprofile("naverSignInCallback()");
        },

        methods : {
          naverSignInCallback () {
            alert(naver_id_login.getProfileData('email'));
            alert(naver_id_login.getProfileData('nickname'));
            alert(naver_id_login.getProfileData('age'));
          }
        }
    }
</script>

<style scoped>

</style>
