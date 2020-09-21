<template>
  <!-- <div
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
        :cell="grid.grid[i][j]"
        :width="cellWidth"
        :height="cellHeight"
      />
    </div>
  </div> -->
  <vue-p5
    @setup="setup"
    @draw="draw"
  />
</template>

<script>
// import Cell from "./Cell";
import VueP5 from 'vue-p5';

export default {
  name: "Maze",
  components: {
    // Cell
    "vue-p5": VueP5
  },
  methods: {
    setup(sketch) {
      sketch.createCanvas(this.height, this.width);
      sketch.background(255);
      sketch.frameRate(120)
      sketch.rect(0, 0, this.height, this.width);
    },
    draw(sketch) {
      if (!this.generate) {
        return;
      }

      sketch.clear();
      sketch.strokeWeight(4);
      sketch.noFill();
      sketch.rect(0, 0, this.height, this.width);

      for (let i = 0; i < this.numOfRows; i++) {
        
        for (let j = 0; j < this.numOfColumns; j++) {
          const cell = this.grid.grid[i][j];

          const topLeft = [ j * this.cellWidth, i * this.cellHeight ];
          const topRight = [ (j + 1) * this.cellWidth, i * this.cellHeight ];
          const bottomRight = [ (j + 1) * this.cellWidth, (i + 1) * this.cellHeight ];
          const bottomLeft = [ [ j * this.cellWidth, (i + 1) * this.cellHeight ] ]

          if (cell.visited) {
            sketch.noStroke();
            if (cell.path) {
              sketch.fill(0, 255, 0, 100);
            } else {
              sketch.fill(255, 0, 255, 100);
            }

            if (cell.startPath) {
              sketch.fill(0, 0, 255, 200);
            }

            if (cell.currentPath) {
              sketch.fill(255, 0, 0, 200);
            }
            
            sketch.rect(...topLeft, this.cellWidth + 0.05, this.cellHeight + 0.05);
          }

          sketch.strokeWeight(2);
          sketch.stroke(0);

          if (cell.visited) {
            sketch.stroke(180, 0, 255);
          }

          if (cell.top) {
            sketch.line(...topLeft, ...topRight); // top border
          }

          if (cell.right) {
            sketch.line(...topRight, ...bottomRight); // right border
          }

          if (cell.bottom) {
            sketch.line(...bottomRight, ...bottomLeft); // bottom border
          }
          
          if (cell.left) {
            sketch.line(...bottomLeft, ...topLeft); // left border
          }
          
        }
      }
    }
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
    },
    generate: {
      type: Boolean,
      default: false
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
