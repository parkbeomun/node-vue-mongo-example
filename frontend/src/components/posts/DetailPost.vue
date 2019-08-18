<template>
    <div>
      제목: <input v-model="title" type="text" placeholder="제목을입력하세요"/>
      <br>
      내용: <input v-model="content" type="text" placeholder="내용을입력하세요"/>
      <br>
      <button v-on:click="save">저장</button>
      <button v-on:click="deletePost">삭제</button>
      <button v-on:click="cancel">취소</button>

    </div>
</template>

<script>
    export default {
      created () {

        this.$http.get(`${this.baseURI}/`+this.$route.params.id)
          .then((response) => {

            this.title = response.data.title;
            this.content = response.data.content;
            this._id = response.data._id;

          })
          .catch((error) => {

          })
      },


      name: "DetailPost",
      data: function () {
          return {
            baseURI : "/api/posts",
            title: '',
            content: '',
            _id: '',
          }
      },
      methods: {
        save : function () {
          this.$http.put(`${this.baseURI}/${this._id}`, {
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
        deletePost: function () {
          this.$http.delete(`${this.baseURI}/${this._id}`)
            .then(response => {
              alert("삭제되었습니다");
              this.$router.go(-1)
            })
            .catch(error => {
              alert("삭제실패 :"+error)
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
