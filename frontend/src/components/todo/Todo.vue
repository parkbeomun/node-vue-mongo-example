<template>
    <div>
      <h1>할일목록</h1>
      <input v-model="text" placeholder="할일을 입력하세요"/>
      <button v-on:click="saveTodo">저장</button>

      <div v-for="todo in todoList">
        <div>
          <strong>{{ todo.title }}</strong>
          <button v-on:click="deleteTodo(todo._id)">x</button>
          <p>{{ todo.createAt }}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      created () {
        this.$http.get(`${this.baseURI}`)
          .then((response) => {
            console.log('success ' + response)
            this.todoList = response.data;
          })
          .catch((error) => {
            console.log('error : '+error)
          })
      },
      name: "Todo",
      data: function () {
        return {
          text: '',
          todoList: [],
          baseURI : "/api/todos"
          }
        },
        methods: {
          saveTodo: function () {
            this.$http.post(`${this.baseURI}/create`, {
              title: this.text
            })
              .then(response => {
                this.todoList = response.data;
                this.text = ''
              })
              .catch(error => {
                console.log(error)
              })
          },
          deleteTodo: function (id) {
            this.$http.delete(`${this.baseURI}/${id}`)
              .then((response)=>{
                this.todoList = response.data;
              })

          },
        }
    }
</script>

<style scoped>

</style>
