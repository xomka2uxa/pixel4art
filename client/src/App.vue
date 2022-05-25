<template>
  <div>
    <component :is="layout">
        <router-view/>
    </component>
  </div>
</template>
<script>
import DefaultLayout from './layouts/DefaultLayout.vue';

export default {
  components: { DefaultLayout },
  computed: {
    layout() {
      return this.$route.meta.layout || 'default-layout';
    },
  },
};
</script>

<style lang="scss">

</style>
