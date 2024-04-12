<template>
  <div class="pokemon-search">
    <h1 class="title">Localize seu </h1>
    <img class="logo-pokemon" src="@/assets/pokemon-logo.png">
    <SearchBar @search="searchPokemon" />
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
      <button class="close" @click="clearErrorMessage">X</button>
    </div>
    <div v-if="filteredPokemons.length > 0" class="pokemon-container">
      <div class="original-pokemon">
        <div v-for="pokemon in filteredPokemons" :key="pokemon.id" class="pokemon-card">
          <PokemonDetails :pokemon="pokemon" @pokemon-clicked="searchEvolutions" />
        </div>
      </div>
      <div class="evolved-pokemon">
        <div v-for="pokemon in filteredPokemons" :key="'evolution-' + pokemon.id" class="pokemon-card">
          <EvolutionList :evolutions="pokemon.evolutions" @evolution-clicked="searchPokemonByName" />
        </div>
      </div>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import PokemonDetails from '@/components/PokemonDetails.vue';
import EvolutionList from '@/components/EvolutionList.vue';

export default {
  name: 'PokemonSearch',
  components: {
    SearchBar,
    PokemonDetails,
    EvolutionList
  },
  data() {
    return {
      pokemonName: '',
      pokemons: [],
      errorMessage: ''
    };
  },
  computed: {
    filteredPokemons() {
      // Aqui você pode adicionar a lógica de filtragem dos pokémons, se necessário
      return this.pokemons;
    }
  },
  methods: {
    async searchPokemon(name) {
      this.errorMessage = '';
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokemon = response.data;
        pokemon.showInfo = false;
        pokemon.evolutions = [];
        this.pokemons = [pokemon];
        await this.searchEvolutions(pokemon);
      } catch (error) {
        this.errorMessage = 'Pokémon inexistente';
      }
    },
    async searchEvolutions(pokemon) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
        const pokemonSpecies = response.data;
        const evolutionChainResponse = await axios.get(pokemonSpecies.evolution_chain.url);
        const evolutionChain = evolutionChainResponse.data;
        let evolutionDetails = evolutionChain.chain;
        while (evolutionDetails.evolves_to.length) {
          const evolution = evolutionDetails.evolves_to[0];
          if (evolution.species.name !== pokemon.name) {
            const sprite = await this.getEvolutionSprite(evolution.species.name);
            const stats = await this.getPokemonStats(evolution.species.name);
            pokemon.evolutions.push({ name: evolution.species.name, sprite, stats, showInfo: false });
          }
          evolutionDetails = evolution;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getPokemonStats(name) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const stats = response.data.stats.map(stat => ({
          name: stat.stat.name,
          base_stat: stat.base_stat
        }));
        return stats;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    async getEvolutionSprite(evolution) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution.toLowerCase()}`);
        return response.data.sprites.front_default;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async searchPokemonByName(name) {
      this.errorMessage = '';
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokemon = response.data;
        pokemon.showInfo = false;
        this.pokemons = [pokemon];
      } catch (error) {
        this.errorMessage = 'Pokémon inexistente';
      }
    },
    clearErrorMessage() {
      this.errorMessage = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.pokemon-search {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1; /* Para garantir que o fundo fique atrás do conteúdo */
  opacity: 0.2; /* Opacidade para criar o efeito de sombreado */
}

.title {
  text-align: center;
  color: #2e63aa;
}

.logo-pokemon {
  width:250px;
  margin-bottom: 20px;
}

.alert {
  margin-top: 20px;
}

.close {
  margin-left: 8px;
  font-size: 18px;
  width: 30px;
  height: 30px;
  color: #842029;
  border-color: #f5c2c7;
  background-color: #f8d7da;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}

.pokemon-container {
  display: flex;
  width: calc(100% - 40px); /* Espaço total da tela menos a margem de 20px de cada lado */
  justify-content: space-between; /* Distribui os elementos igualmente */
  padding: 0 20px; /* Adiciona um pequeno espaçamento nas laterais */
  margin-top: 20px; /* Adiciona uma margem no topo */
}

.original-pokemon,
.evolved-pokemon {
  width: 50%; /* Cada lado ocupa metade do container */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-card {
  margin-top:50px !important;
  width: 100%; /* Largura do cartão do Pokémon */
}

@media (max-width: 768px) { /* Para dispositivos com largura de tela maior ou igual a 768px */
  .pokemon-card {
    margin-top:0;
    width: 100%; /* Largura do cartão do Pokémon em resoluções maiores */
    margin-bottom: 20px; /* Adiciona um pequeno espaçamento entre os Pokémon */
  }
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/background-mob.png'); /* URL da sua imagem de fundo para dispositivos móveis */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
    opacity: 0.2;
  }

  .original-pokemon,
  .evolved-pokemon {
    width: 100%; /* Define a largura como 100% para ocupar a largura total */
  }

  .pokemon-container {
    flex-direction: column; /* Alinha os elementos verticalmente */
  }
}
</style>
