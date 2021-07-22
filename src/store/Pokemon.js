import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let api_endpoint = 
  // "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
  "/dataPokemon.json";

Vue.use(Vuex)

export default new Vuex.Store({
  // state คือ field in oop
  state: {
    data: []
  },

  getters: {
    pokemons: (state) => state.data,
  },

  // mutations เหมือน private setter in oop, เอาไว้เปลี่ยนแปลงค่าใน state
  mutations: {
    fetch (state, { res }) {
      state.data = res.data
    },
    add (state, { payload }) {
      state.data.push(payload)
    },
    edit (state, { payload }) {
      state.data[payload.index].name = payload.name
      state.data[payload.index].type = payload.type
    }
  },

  // actions เหมือน public methods in oop, 
  // ให้ภายนอกเรียกใช้ หรือ ดึงข้อมูลจากภายนอก
  actions: {
    // commit เป็น keyword ไว้เรียก mutation
    async fetchPokemon({ commit }) {
      // สมมติไปเรียกข้อมูลจาก API
      // let res = {
      //   data: [
      //     {
      //         name: {
      //             english: 'Bulbasaur',
      //             japanese: 'Fushikidane'
      //         },
      //         type: ['Grass', 'Poison']
      //     },
      //     {
      //         name: {
      //             english: 'Bulbasaur 2',
      //             japanese: 'Fushikidane 2'
      //         },
      //         type: ['Grass', 'Poison']
      //     },
      //   ]
      // }
      let res = await axios.get(api_endpoint)
      commit('fetch', { res })
    },
    addPokemon({ commit }, payload) {
      // todo: call api to add data
      commit("add", { payload })
    },
    editPokemon({ commit }, payload) {
      // todo: call api to edit data
      commit("edit", { payload })
    }
  },
  modules: {
  }
})
