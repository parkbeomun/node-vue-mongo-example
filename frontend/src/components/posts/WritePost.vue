<template>
    <div>
      제목: <input v-model="title" type="text" placeholder="제목을입력하세요"/>
      <br>
      내용: <input v-model="content" type="text" placeholder="내용을입력하세요"/>
      <br>
      <button v-on:click="save">저장</button>
      <button v-on:click="cancel">취소</button>

    </div>
</template>

<script>
    export default {
        name: "WritePost",
      data: function () {
          return {
            baseURI : "/api/posts",
            title: '',
            content: '',
          }
      },
      methods: {
        save : function () {
          this.$http.post(`${this.baseURI}/create`, {
            title : this.title,
            content: this.content
          })
            .then((response) => {
              alert("저장되었습니다");
              this.$router.go(-1)
            })
            .catch((error) => {
              alert("저장을 실패했습니다 :"+error);
            })
        },
        cancel : function () {
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>

</style>
