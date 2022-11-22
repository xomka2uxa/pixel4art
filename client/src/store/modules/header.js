export default {
  namespaced: true,
  state: {
    isHeaderTransparent: false,
    isHeaderCanClosed: false,
    isHeaderHidden: false,
  },

  getters: {
    isHeaderTransparent(state) {
      return state.isHeaderTransparent;
    },

    isHeaderCanClosed(state) {
      return state.isHeaderCanClosed;
    },

    isHeaderHidden(state) {
      return state.isHeaderHidden;
    },
  },

  mutations: {
    setHeaderTransparent(state, flag) {
      state.isHeaderTransparent = flag;
    },

    setHeaderCanClosed(state, flag) {
      state.isHeaderCanClosed = flag;
    },

    toggleHeaderHidden(state) {
      state.isHeaderHidden = !state.isHeaderHidden;
    },
  },

  actions: {
    setHeaderTransparent({ commit }, flag) {
      commit("setHeaderTransparent", flag);
    },

    setHeaderCanClosed({ commit }, flag) {
      commit("setHeaderCanClosed", flag);
    },

    toggleHeaderHidden({ commit }) {
      commit("toggleHeaderHidden");
    },
  },
};
