<template>
  <div
    class="cell"
    :class="{ visited: visited, top: borders[0], right: borders[1], bottom: borders[2], left: borders[3], current: current }"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
</template>

<script>
export default {
  name: "Cell",
  computed: {
    visited() {
      return this.cell.visited
    },
    borders() {
      return [ this.cell.top, this.cell.right, this.cell.bottom, this.cell.left ]
    },
    current() {
      return this.cell.current;
    }
  },
  props: {
    cell: {
      type: Object,
      default() {
        return {}
      }
    },
    width: {
      type: Number,
      default: 10
    },
    height: {
      type: Number,
      default: 10
    }
  }
}
</script>

<style scoped>
.visited {
    background-color: rgb(122, 45, 173)
}

.current {
    background-color: yellowgreen !important;
}

.top {
    border-top: 1px solid black;
}

.right {
    border-right: 1px solid black;
}

.bottom {
    border-bottom: 1px solid black;
}

.left {
    border-left: 1px solid black;
}
</style>