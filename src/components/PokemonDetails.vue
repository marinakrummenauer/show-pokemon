<template>
  <div class="pokemon-details" :class="{ 'flipped': showInfo }">
    <div class="pokemon-card" @click="toggleInfo">
      <div class="card-front">
        <h4>{{ capitalizeFirstLetter(pokemon.name) }}</h4>
        <img :src="pokemon.sprites.front_default" alt="Pokemon sprite">
      </div>
      <div class="card-back" v-if="showInfo">
        <ul>
          <li v-for="(stat, index) in pokemon.stats" :key="index">
            {{ stat.stat.name }}: <span class="info-value">{{ stat.base_stat }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showInfo: false
    };
  },
  methods: {
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style lang="scss">
.pokemon-details {
  margin-bottom: 20px;
  cursor: pointer;
  width: 220px; /* Largura da carta de baralho */
  height: 250px; /* Altura da carta de baralho */
  perspective: 1000px; /* Define a perspectiva para a rotação da carta */
  position: relative;
  margin-bottom: 20px;
}

.pokemon-card {
  margin-top:50px;
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d; /* Mantém a perspectiva da rotação */
  transition: transform 0.5s; /* Adiciona uma transição suave de rotação */
}

.card-front, .card-back {
  position: absolute;
  width: 200px;
  height: 200px;
  backface-visibility: hidden; /* Esconde o verso da carta */
}

.card-front {
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}

.card-back {
  border-radius: 8px;
  background-color: #f0f0f0;
  transform: rotateY(180deg); /* Rotaciona o verso da carta */
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}

.flipped .pokemon-card {
  transform: rotateY(180deg); /* Rotaciona a carta ao clicar */
}

.img-container {
  position: relative;
}

.img-container::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid blue; /* Cor da linha */
  border-radius: 10px; /* Arredonda as bordas */
  animation: animateBorder 2s linear infinite; /* Adiciona a animação de corrida */
}

@keyframes animateBorder {
  0% {
    transform: rotate(0deg); /* Começa na parte superior do card */
  }
  100% {
    transform: rotate(360deg); /* Completa uma volta em volta do card */
  }
}

img {
  width: 100px; /* Redimensionando o tamanho do sprite */
  height: 120px; /* Redimensionando o tamanho do sprite */
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
}

.info-value {
  font-weight: bold;
}
</style>
