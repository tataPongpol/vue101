<template>
  <div>
    <pokedex-create-form></pokedex-create-form>
  </div>
</template>

<script>
import PokedexCreateForm from '@/components/PokedexCreateForm.vue'
import AuthUser from '@/store/AuthUser'
export default {
    components: {
        PokedexCreateForm
    },
    mounted() {
        if (!this.isAuthen()) {
            this.$swal("Restricted Area", "You have no permission", "warning")
            this.$router.push("/pokedex")
        }
    },
    methods: {
        isAuthen() {
            return AuthUser.getters.isAuthen
        }
    }
}
</script>

<style>

</style>