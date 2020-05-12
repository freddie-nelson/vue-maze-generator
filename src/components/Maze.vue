<template>
  <div
    class="maze"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div
      v-for="(row, i) in numOfRows"
      :key="i"
      class="row"
    >
      <Cell
        v-for="(column, j) in numOfColumns"
        :key="j"
        :width="cellWidth"
        :height="cellHeight"
      />
    </div>
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
    grid: {
      type: Object,
      default() {
        return {
          grid: [[]]
        }
      }
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
}
</style>
