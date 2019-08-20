<template>
  <div id="app">
    <div class="main main-top">
      <nav-component></nav-component>
    </div>
    <div class="main main-center">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import NavComponent from './components/NaviComponent'
export default {
  name: 'App',
  components: {
    'navComponent' : NavComponent
  },
}
</script>

<style>
  html, body{
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    height: 100%;
  }

  .main {
    border: 1px solid #b3b7bb;
  }
  .main-top {
    background-color: #619cff;
    width: 100%;
    height: 50px;

  }
  .main-center {
    margin-top: 5px;
    background-color: rgb(249, 249, 249);
    height: 100%;
  }
</style>
