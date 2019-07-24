<template>
    <div>
      <h1>게시글</h1>
      <div id="boardcss_list_add_button_table">
        <router-link to="/post/write">글작성</router-link>
      </div>
      <div v-if="hasPosts">
        <div v-for="post in posts">
          <p class="post title">{{ post.title }}</p>
          <p class="post createAt">{{ post.createAt }}</p>
          <button v-on:click="deletePost(post._id)">x</button>
        </div>
      </div>
      <p v-else>게시글이 없습니다</p>
    </div>
</template>

<script>
    export default {
        created () {
          console.log("1")
          this.$http.get(`${this.baseURI}`)
            .then((result) => {
              console.log(result)
              this.posts = result.data;
            })
            .catch((error) => {
              console.log(error)
            })
        },
        name: "Post",
      data: function () {
          return {
            posts: [],
            baseURI : "/api/posts"
          }
      },
      computed: {
        hasPosts: function () {
          return this.posts.length > 0
        }
      },
      methods: {
        deletePost: function (id) {
          this.$http.delete(`${this.baseURI}/${id}`)
            .then(response => {
              alert("삭제되었습니다");
              this.posts = response.data;
            })
            .catch(error => {
              alert("삭제실패")
            })
        },
      }

    }
</script>

<style scoped>
  .post {
    display:inline;
  }
</style>
