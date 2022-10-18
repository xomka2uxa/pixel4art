import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { vfmPlugin } from "vue-final-modal";
import "./assets/scss/main.scss";

import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";

import { Vue3Mq } from "vue3-mq";

createApp(App)
  .use(store)
  .use(router)
  .use(vfmPlugin)
  .use(Vue3Mq, {
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  })
  .use(mdiVue, {
    icons: mdijs,
  })
  .mount("#app");
