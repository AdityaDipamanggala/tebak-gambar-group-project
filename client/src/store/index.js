import Vue from 'vue';
import Vuex from 'vuex';

import socket from '../config/socket';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        image: '',
        answer: '',
        leaderData: []
    },
    mutations: {
        setAnswer(state, answer) {
            state.answer = answer;
        },
        setImage(state, image) {
            state.image = image;
        },
        setLeaderData(state, data) {
            state.leaderData = data;
        }
    },
    actions: {
        postAnswer(context) {
            socket.emit('answer', { id: localStorage.id, answer: context.state.answer });
            context.commit('setAnswer', '');
        },
        broadcast(context, message) {
            socket.emit('ngebroadcast', message);
        }
    },
    modules: {}
});
