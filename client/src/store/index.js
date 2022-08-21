import { createStore } from "vuex";

export default createStore({
  state: {
    selectedColor: "",
    colorPallete: [],
  },
  getters: {
    getSelectedColor(state) {
      return state.selectedColor;
    },

    getColorPallete(state) {
      return state.colorPallete;
    },
  },
  mutations: {
    setSelectedColor(state, color) {
      state.selectedColor = color;
    },

    addColorInPallete(state, color) {
      if (!state.colorPallete.includes(color)) {
        state.colorPallete.push(color);
      }
    },
  },
  actions: {
    setSelectedColor({ commit }, color) {
      commit("setSelectedColor", color);
    },

    addColorInPallete({ commit }, color) {
      commit("addColorInPallete", color);
    },
  },
  modules: {},
});
