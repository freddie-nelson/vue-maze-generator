<template>
  <div id="app">
    <Maze
      :grid="grid"
      :width="900"
      :height="900"
      :generate="generate"
    />
    <input
      v-model="gridSize"
      type="range"
      name="Maze Size"
      min="5"
      max="200"
      step="1"
    >
    <button @click="resetMaze">
      Reset Maze
    </button>
    <button @click="grid.generateMaze()">
      Generate Maze
    </button>
    <button @click="pathfinder.startPathfinder()">
      Solve Maze
    </button>
  </div>
</template>

<script>
import Maze from "./components/Maze.vue";
import { Grid } from "./logic/grid";
import Pathfinder from "./logic/pathfinder";
import { debounce } from "debounce";

export default {
  name: 'App',
  data() {
    return {
      grid: {},
      pathfinder: {},
      gridSize: 50,
      generate: true
    }
  },
  watch: {
    gridSize(val) {
      this.gridSize = Number(val);
      this.resetMaze();
    }
  },
  methods: {
    resizeGrid(size) {
      this.grid.clearGrid(size);
    },
    resetMaze() {
      this.grid.clearGrid(this.gridSize);
      this.pathfinder = new Pathfinder(this.grid.grid);
    }
  },
  components: {
    Maze
  },
  beforeMount() {
    this.grid = new Grid(this.gridSize);
    this.pathfinder = new Pathfinder(this.grid.grid);

    this.resizeGrid = debounce(this.resizeGrid, 500);
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
