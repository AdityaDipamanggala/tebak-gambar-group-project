import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        image: '',
        id: new Date().getTime(),
        answer: '',
        point: 0,
        nick: '',
    },
    mutations: {
        getAnswer(state, answer) {
            state.answer = answer
        }
    },
    actions: {
        postAnswer(context){
            socket.emit('answer', { id: localStorage.id, answer: context.state.answer });
            context.commit('getAnswer', '')
        }
    },
    modules: {}
});
