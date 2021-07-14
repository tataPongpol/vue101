<template>
  <div class="mb-20">
      Counter: {{ number }}
      <div>
          <label for="counter" v-bind:title="number">Counter: </label>
          <!-- <input type="text" v-bind:value="number"/> -->
          <input type="text" v-model="number"/>
          <button v-on:click="increase">+</button>
          <button v-on:click="decrease">-</button>
          <button v-on:click="plusByTen">+10</button>
          <button v-on:click="mulByTwo">x2</button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            number: 0,
        }
    },
    methods: {
        increase() {
            this.number++;
        },
        decrease() {
            this.number--;
        },
        plusByTen() {
            this.number += 10;
        },
        mulByTwo() {
            this.number *= 2;
        }
    }
}
</script>

<style lang="scss" scoped>
    .mb-20 {
        margin-bottom: 20px;
    }
</style>
