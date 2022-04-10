<template>
  <div id="template-container">
    <Header/>
    <div class="body">
      <p>This is the template page</p>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  name: "BudgetTemplate",
  components: { Header },
  data: () => ({

  }),
};
</script>

<style>
.body {
  padding-top: 130px;
}
</style>