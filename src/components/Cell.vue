<template>
  <div
    class="cell"
    :class="{ visited: this.cell.visited, top: this.cell.top, right: this.cell.right, bottom: this.cell.bottom, left: this.cell.left }"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
</template>

<script>
export default {
  name: "Cell",
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