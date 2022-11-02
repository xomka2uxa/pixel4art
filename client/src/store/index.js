import { createStore } from "vuex";
import header from "./modules/header";

export default createStore({
  modules: {
    header,
  },

  state: {
    selectedColor: "rgb(255, 136, 0)",
    colorPallete: [],
    currentSizesPaint: [50, 50],
    defaultSizesPaint: {
      xs: [20, 20],
      sm: [50, 50],
      md: [80, 80],
      lg: [100, 100],
      custom: "Свои размеры",
    },
    rectList: [],
    isCanvasClean: false,
    isUndoLastAction: false,
    isReturnFromHistoryList: false,
    cntHistoryAction: 0,
    historyMode: false,
  },

  getters: {
    selectedColor(state) {
      return state.selectedColor;
    },

    colorPallete(state) {
      return state.colorPallete;
    },

    currentSizesPaint(state) {
      return state.currentSizesPaint;
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

    cntHistoryAction(state) {
      return state.cntHistoryAction;
    },

    historyMode(state) {
      return state.historyMode;
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
      state.selectedColor = state.colorPallete.length ? state.colorPallete[0] : "rgb(255, 136, 0)";
    },

    setSizePaint(state, size) {
      state.currentSizesPaint = size;
    },

    setCustomSizePaint(state, size) {
      size[0] = +size.cols;
      size[1] = +size.rows;
      delete size.cols;
      delete size.rows;
      state.currentSizesPaint = size;
    },

    setRectList(state, list) {
      state.rectList = list;
    },

    setCanvasClean(state, flag) {
      state.isCanvasClean = flag;
    },

    undoLastAction(state, flag) {
      state.isUndoLastAction = flag;
    },

    returnFromHistoryList(state, flag) {
      state.isReturnFromHistoryList = flag;
    },

    setCntHistoryAction(state, flag) {
      if (flag === null) {
        state.cntHistoryAction = 0;
      } else {
        if (flag) {
          state.cntHistoryAction += state.cntHistoryAction < 5 ? 1 : 0;
        } else {
          state.cntHistoryAction -= state.cntHistoryAction >= 0 ? 1 : 0;
        }
      }
    },

    setHistoryMode(state, flag) {
      state.historyMode = flag;
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

    undoLastAction({ commit }, flag) {
      commit("undoLastAction", flag);
    },

    returnFromHistoryList({ commit }, flag) {
      commit("returnFromHistoryList", flag);
    },

    setCntHistoryAction({ commit }, flag) {
      commit("setCntHistoryAction", flag);
    },

    setHistoryMode({ commit }, flag) {
      commit("setHistoryMode", flag);
    },
  },
});
