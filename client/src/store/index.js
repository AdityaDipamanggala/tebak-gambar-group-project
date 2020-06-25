import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {}
});
