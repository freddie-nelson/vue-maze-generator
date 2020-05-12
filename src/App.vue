<template>
  <div id="app">
    <Maze
      :grid="grid"
      :width="900"
      :height="900"
    />
    <input
      v-model="gridSize"
      type="range"
      name="Maze Size"
      min="5"
      max="100"
      step="1"
    >
    <button @click="grid.clearGrid()">
      Reset Maze
    </button>
    <button @click="grid.generateMaze()">
      Generate Maze
    </button>
  </div>
</template>

<script>
import Maze from "./components/Maze.vue";
import { Grid } from "./logic/grid";
import { debounce } from "debounce";

export default {
  name: 'App',
  data() {
    return {
      grid: {},
      gridSize: 40
    }
  },
  watch: {
    gridSize(val) {
      this.resizeGrid(Number(val))
    }
  },
  methods: {
    resizeGrid(size) {
      this.grid.clearGrid(size);
    }
  },
  components: {
    Maze
  },
  beforeMount() {
    this.grid = new Grid(this.gridSize);

    this.resizeGrid = debounce(this.resizeGrid, 500)
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
