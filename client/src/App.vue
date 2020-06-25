<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{ image }}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import store from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
        socket.on('question', (image) => {
            console.log(image);
            this.image = image;
        });
        socket.on(this.id, (isCorrect) => {
            if (isCorrect) this.point += 10;
            else this.point--;
        });
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
