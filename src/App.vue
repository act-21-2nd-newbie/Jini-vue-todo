<template>
  <div id="app">
    <TodoPage/>
  </div>
</template>

<script>
import TodoPage from "./pages/TodoPage";

export default {
  name: 'App',
  components: {
    TodoPage
  }
}
</script>

<style>
#app {

  display:flex;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
