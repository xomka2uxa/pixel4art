<template>
  <div class="wrapper">
    <header-app />
    <slot />
    <footer-app />
  </div>
</template>

<script>
import HeaderApp from "@/components/default/HeaderApp.vue";
import FooterApp from "@/components/default/FooterApp.vue";

export default {
  name: "DefaultLayout",
  components: {
    HeaderApp,
    FooterApp,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
  },
};
</script>

<style lang="scss">
html {
  font-size: 16px;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-size: 1rem;
}
.wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
  min-height: 100vh;
}
h2,
h3,
p {
  margin-top: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
  display: block;
  padding: 5px;
}
a:hover {
  color: rgb(62, 62, 62);
  background-color: rgb(210, 218, 140);
}

h2 {
  text-align: center;
}
.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 10px;
}
</style>
