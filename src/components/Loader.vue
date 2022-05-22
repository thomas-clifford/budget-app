<template>
  <div  class="loader" v-if="!isLoaded">
    <v-progress-circular indeterminate size="100" color="primary">
      Loading...
    </v-progress-circular>
  </div>
</template>

<script>
export default {
    data: () => ({
        isLoaded: false
  }),
  mounted() {
      document.onreadystatechange = () => {
          if (document.readyState == "complete") {
              this.isLoaded = true;
          }
      }
  }
};
</script>

<style>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 100px;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    z-index: 999;
}
</style>