<template>
  <div>
    <form @submit.prevent="searchPokemon">
      <input type="text" v-model="pokemonName" placeholder="Pesquise aqui seu Pokémon">
      <button type="submit">Buscar</button>
    </form>
    <ul v-if="pokemon">
      <li v-for="pokemon in pokemons"  v-bind:key="pokemon.id">{{ pokemon.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemonName: '',
      pokemons: []
    }
  },
  methods: {
    async searchPokemon() {
      const response = await this.$http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`);
      this.pokemons = response.data;
    }
  }
}
</script>