<template>
  <div id="home-container">
    <p class="text-h4">Landing Page</p>
    <p id="about" v-on:click="navigateTo('Home')">GO TO HOME PAGE</p>
  </div>
</template>

<script>
export default {
  name: "Landing",
  data: () => ({}),
  methods: {
    navigateTo(path) {
      this.$router.replace({ name: `${path}` }).catch(() => {});
    },
  },
};
</script>
<style scoped>
</style>
