<template>
    <div>
        <!-- <pokedex-create-form></pokedex-create-form> -->
        <router-link v-if="isAuthen()" to="/pokedex/create">Add New Pokemon</router-link>
        <pokedex-table></pokedex-table>
    </div>
</template>

<script>
// import PokedexCreateForm from '@/components/PokedexCreateForm.vue'
import PokedexTable from '@/components/PokedexTable.vue'
import AuthService from '@/services/AuthService'
import AuthUser from '@/store/AuthUser'
export default {
  components: { 
    PokedexTable,
    // PokedexCreateForm 
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen
    }
  }
    
}
</script>

<style scoped>

</style>
