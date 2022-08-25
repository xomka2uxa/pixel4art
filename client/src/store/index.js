import { createStore } from "vuex";
const defaultSizePaint = { name: "sm", value: [50, 50] };

export default createStore({
  state: {
    selectedColor: "",
    colorPallete: [],
    selectedSizePaint: defaultSizePaint,
    defaultSizesPaint: {
      xs: [20, 20],
      sm: [50, 50],
      md: [80, 80],
      lg: [100, 100],
      custom: "Свои размеры",
    },
    rectList: [],
    isCanvasClean: false,
  },
  getters: {
    selectedColor(state) {
      return state.selectedColor;
    },

    colorPallete(state) {
      return state.colorPallete;
    },

    selectedSizePaint(state) {
      return state.selectedSizePaint;
    },

    defaultSizesPaint(state) {
      return state.defaultSizesPaint;
    },

    rectList(state) {
      return state.rectList;
    },

    isCanvasClean(state) {
      return state.isCanvasClean;
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

    removeColorInPallete(state, color) {
      state.colorPallete = state.colorPallete.filter((c) => c !== color);
      state.selectedColor = state.colorPallete.length
        ? state.colorPallete[0]
        : "rgb(255, 136, 0)";
    },

    setSizePaint(state, size) {
      state.selectedSizePaint = {
        name: size,
        value: state.defaultSizesPaint[size],
      };
    },

    setCustomSizePaint(state, size) {
      state.selectedSizePaint = {
        name: "custom",
        value: [+size.cols, +size.rows],
      };
    },

    setRectList(state, list) {
      state.rectList = list;
    },

    setCanvasClean(state, flag) {
      state.isCanvasClean = flag;
    },
  },
  actions: {
    setSelectedColor({ commit }, color) {
      commit("setSelectedColor", color);
    },

    addColorInPallete({ commit }, color) {
      commit("addColorInPallete", color);
    },

    removeColorInPallete({ commit }, color) {
      commit("removeColorInPallete", color);
    },

    setSizePaint({ commit }, size) {
      commit("setSizePaint", size);
    },

    setCustomSizePaint({ commit }, size) {
      commit("setCustomSizePaint", size);
    },

    setRectList({ commit }, list) {
      commit("setRectList", list);
    },

    setCanvasClean({ commit }, flag) {
      commit("setCanvasClean", flag);
    },
  },
  modules: {},
});
