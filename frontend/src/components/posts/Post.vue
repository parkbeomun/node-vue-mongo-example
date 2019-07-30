<template>
    <div>
      <h1>게시글</h1>
      <div v-if="hasPosts">
        <table class="table post-table">
          <thead>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>조회수</th>
          </thead>
          <tbody>
            <tr v-for="post in posts">
              <td>{{post.num}}</td>
              <td v-on:click="titleClick(post._id)">{{post.title}}</td>
              <td>{{post.writer}}</td>
              <td>{{post.createAt}}</td>
              <td>{{post.cknum}}</td>
            </tr>
          </tbody>
        </table>
        <div class="div-write">
          <router-link to="/post/write" class="btn btn-default btn-write"np>글작성</router-link>
        </div>



<!--        <div v-for="post in posts">-->
<!--          <p class="post title">{{ post.title }}</p>-->
<!--          <p class="post createAt">{{ post.createAt }}</p>-->
<!--          <button v-on:click="deletePost(post._id)">x</button>-->
<!--        </div>-->
      </div>
      <p v-else>게시글이 없습니다</p>
    </div>
</template>

<script>
    export default {

        created () {
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
            //posts: [],
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
        titleClick: function (id) {
          this.$router.push(`/post/detail/${id}`)
        }
      },
    }
</script>

<style scoped>
  .post {
    display:inline;
  }
  .post-table {
    position: relative;
    background-color: #7abaff;
    width: 1300px;
    height: 200px;
    border: 2px solid #818182;
    margin: auto;
  }
  .btn-write {
    font-size: 14px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 3px;
    padding-top: 3px;
    border: 1px solid #4e555b;
  }
  .div-write {
    width: 100px;
    margin-top: 30px;
    margin-left: 70px;
  }
</style>
