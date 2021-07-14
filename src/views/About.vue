<template>
  <div class="about">
    <h1>This is an about page</h1>
    <hello-world text="test props"></hello-world>
    <hello-world number="3000"></hello-world>
    <p>Test by tataman</p>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
export default {
  components: {
    HelloWorld
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/_variable.scss';
  // h1 {
  //   color: $primary;
  // }
  p {
    color: $primary;
  }
</style>
