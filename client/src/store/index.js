import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client';
const socket = io('http://localhost:3000');


Vue.use(Vuex)

export default new Vuex.Store({  
  state: {
    image: '',
    id: new Date().getTime(),
    nick: '',
    point: 0,
    answer: ''
  },
  mutations: {

  },
  actions: {
    postAnswer(context, payload) {
      socket.emit('answer', { id: context.state.id, answer: contex.state.answer });
    }

  },
  modules: {

  }
})
