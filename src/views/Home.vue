<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- CamelCase -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- kebab-case -->
    <hello-world msg="components HelloWorld 2"></hello-world>
    <h3>H3 in home</h3>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
