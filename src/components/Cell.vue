<template>
  <div
    class="cell"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
</template>

<script>
export default {
  name: "Cell",
  props: {
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
.cell {
    border: 1px solid black;
}
</style>