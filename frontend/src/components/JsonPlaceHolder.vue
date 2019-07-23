<template>
  <div>
    <h1>https://jsonplaceholder.typicode.com</h1>


    <div v-if="hasResult">
      <div v-for="post in posts">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>
    <button v-else v-on:click="searchTerm">불러오기</button>
  </div>
</template>

<script>
  export default {
    name: "Post",
    data: function () {
      return {
        posts: []
      }
    },
    computed: {
      hasResult: function () {
        return this.posts.length > 0
      }
    },
    methods: {
      searchTerm: function () {
        // using JSONPlaceholder
        const baseURI = "https://jsonplaceholder.typicode.com";
        this.$http.get(`${baseURI}/posts`)
          .then((result) => {
            console.log(result);
            this.posts = result.data;
          })
      }
    }

  }
</script>

<style scoped>

</style>
