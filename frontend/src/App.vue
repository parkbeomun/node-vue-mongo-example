<template>
  <div id="app">
    <img src="./assets/logo.png">
    <nav-component></nav-component>
    <router-view/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
