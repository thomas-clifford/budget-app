<template>
  <div id="about-container">
    <Header />
    <div class="body">
      <p>About page</p>
      <p>Author: Thomas Clifford</p>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "Home",
  components: { Header },
  data: () => ({}),
};
</script>
<style scoped>
.body {
  padding-top: 130px;
}
#about-container {
  text-align: center;
  width: 80%;
  margin: 0 auto;
}
</style>
