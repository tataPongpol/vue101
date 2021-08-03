import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthService from '@/services/AuthService'

let api_endpoint = process.env.VUE_APP_POKEDEX_ENDPOINT || "http://localhost:1337"

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
  // mutations update state เฉยๆ
  mutations: {
    fetch (state, { res }) {
      state.data = res.data
    },
    add (state, payload) {
      state.data.push(payload)
    },
    edit (state, index, data) {
      state.data[index] = data  // change reference
    }
  },

  // actions เหมือน public methods in oop, 
  // ให้ภายนอกเรียกใช้ หรือ ดึงข้อมูลจากภายนอก
  // actions update API
  actions: {
    // commit เป็น keyword ไว้เรียก mutation
    async fetchPokemon({ commit }) {
      let res = await axios.get(api_endpoint + "/monsters")
      // console.log(res);
      commit('fetch', { res })
    },
    async addPokemon({ commit }, payload) {

      // ["Fire", "Flying"]
      // ["name_in=Fire", "name_in=Flying"] หน้าตาหลัง map line47
      // "name_in=Fire&name_in=Flying" query นี้จะไปเช็คว่า id ของ Fire กับ Flying คือไร
      console.log('payload', payload);
      let qs = payload.pokemon_types.map(it => "name_in=" + it).join('&')
      // qs = query string
      console.log('qs', qs);

      let res_types = await axios.get(api_endpoint+"/types?"+qs)

      console.log(res_types.data.map(it => it.id));
      // Array.map() เปลี่ยนข้อมูลด้านในจากชุดนึงให้เป็นอีกชุดนึง
      // Array.filter() จะได้ array ที่เงี่อนไขตรงกับที่เซตไว้
      // Array.reduce() ลดรูป

      let url = api_endpoint + "/monsters"
      let user = AuthService.getUser()
      let user_id = user.id
      let body = {
        name: payload.name,
        name_jp: payload.name_jp,
        pokemon_types: res_types.data.map(it => it.id),
        user: user.id
      }
      try {
        let headers = AuthService.getApiHeader()
        let res = await axios.post(url, body, headers)
        // let data = res.data
        if (res.status === 200) {
          commit("add", res.data)
          return {
            success: true,
            data: res.data
          }
        }
        else {
          console.err(res);
          return {
            success: false,
            message: "Unknow status code: " + res.status
          }
        }
      }
      catch(e) {
        if (e.response.status === 403) {
          console.error(e.response.data.message)
          return {
            success: false,
            message: e.response.data.message
          }
        }
        else {
          return {
            success: false,
            message: "Unknow error: " + e.response.data
          }
        }
      }
    },
    async editPokemon({ commit }, payload) {
      console.log('payload', payload);
      let qs = payload.pokemon_types.map(it => "name_in=" + it).join('&')
      let res_types = await axios.get(api_endpoint+"/types?"+qs)
      
      let url = api_endpoint + "/monsters/" + payload.id
      let body = {
        name: payload.name,
        name_jp: payload.name_jp,
        pokemon_types: res_types.data.map(it => it.id)
      }
      let res = await axios.put(url, body)
      console.log(res);
      if (res.status === 200) {
        // res.data = respond ที่ได้กลับมาจาก axios
        commit("edit", payload.index, res.data)
      }
      else {
        console.err(res);
      }
    }
  },
  modules: {
  }
})
