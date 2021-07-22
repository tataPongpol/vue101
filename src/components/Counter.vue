<template>
  <div class="mb-20">
      Counter: {{ number }}
      <div>
          <!-- shorthand of v-bind:xxx is :xxx  -->
          <label for="counter" :title="number">Counter: </label>
          <input type="text" v-model="number"/>
          <!-- shorthand of v-on:xxx is @xxx  -->
          <button @click="increase(1)">+</button>
          <button @click="increase(-1)">-</button>
          <button @click="increase(10)">+10</button>
          <button @click="increase(number)">x2</button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // full is this.initNumber === undefined ? 10 : this.initNumber
            number: this.initNumber || 0,    // เอาค่าจาก props ใส่ให้ number
        }
    },
    props: {
        initNumber: {
            type: [String],
            
        }
    },
    methods: {
        increase(number) {
            this.number += number;
        },
        // decrease() {
        //     this.number--;
        // },
        // plusByTen() {
        //     this.number += 10;
        // },
        // mulByTwo() {
        //     this.number *= 2;
        // }
    }
}
</script>

<style lang="scss" scoped>
    .mb-20 {
        margin-bottom: 20px;
    }
</style>
