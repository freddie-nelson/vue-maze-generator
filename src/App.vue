<template>
  <div id="app">
    <Maze
      :grid="grid"
      :width="1000"
      :height="1000"
    />
  </div>
</template>

<script>
import Maze from "./components/Maze.vue";
import { Grid } from "./logic/grid";

export default {
  name: 'App',
  data() {
    return {
      grid: {}
    }
  },
  components: {
    Maze
  },
  beforeMount() {
    this.grid = new Grid(200, 200);
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
