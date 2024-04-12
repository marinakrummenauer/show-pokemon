<template>
  <form @submit.prevent="searchPokemon">
    <input type="text" v-model="pokemonName" placeholder="Pesquise seu Pokémon" class="search-input" @input="inputChanged">
    <button type="submit" class="pokeball-button">Buscar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      pokemonName: ""
    };
  },
  methods: {
    searchPokemon() {
      if (!this.pokemonName.trim()) {
        alert("Preenchimento obrigatório");
        return;
      }
      this.$emit("search", this.pokemonName);
      this.pokemonName = "";
    },
    inputChanged() {
      // Adicione qualquer lógica que você precise quando o campo de entrada é alterado
      console.log('Campo de entrada alterado!');
    }
  }
};
</script>

<style lang="scss">
form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

input {
  border: 2px solid #f1c204;
  border-radius: 10px; /* Cantos arredondados */
  padding: 8px;
  margin-right: 8px!important; /* Afastado do botão */
  transition: border-color 0.3s; /* Transição suave de cor da borda */
}

input:focus {
  border-color: #2e63aa; /* Cor da borda ao focar */
}

button {
  background-color: #2e63aa;
  color: #f1c204;
  border: 2px solid #2e63aa;
  border-radius: 10px;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s; /* Adiciona transição suave de cor */
}

button:hover {
  background-color: #1d3d6f;
}

/* Estilos para o botão Pokebola */
.pokeball-button {
  background-image: url('@/assets/Pokebola-pokeball.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 40px;
  height: 40px;
  text-indent: -9999px; /* Oculta o texto do botão */
  border-radius: 50%; /* Garante que o botão tenha a forma circular da pokébola */
  transition: box-shadow 0.3s; /* Adiciona transição suave de sombra */
}

.pokeball-button:active {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7); /* Adiciona efeito de luz ao clicar */
}
</style>
