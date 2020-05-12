<template>
  <div class="maze">
    <Cell
      :width="cellWidth"
      :height="cellHeight"
    />
  </div>
</template>

<script>
import Cell from "./Cell";

export default {
  name: "Maze",
  components: {
    Cell
  },
  computed: {
    numOfRows() {
      return this.grid.grid.length;
    },
    numOfColumns() {
      return this.grid.grid[0].length;
    },
    cellHeight() {
      return this.height / this.numOfRows;
    },
    cellWidth() {
      return this.width / this.numOfColumns;
    }
  },
  props: {
    grid: Object,
    width: Number,
    height: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
