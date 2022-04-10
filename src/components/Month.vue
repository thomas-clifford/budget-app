<template>
  <div>
    <p class="text-h4">{{ monthData.name.toUpperCase() }}</p>
    <p>Projected Account Balance:</p>
    <p>Actual Account Balance:</p>
    <p>Difference:</p>
    <p class="text-h4">Assets</p>
    <CategoryTable v-for="(category, index) in monthData.assetCategories" :key="index" :category="category"/>

    <p class="text-h4 pt-5">Spending</p>
    <div class="spending-container">
      <CategoryTable v-for="(category, index) in monthData.spendingCategories" :key="index" :category="category"/>
    </div>
  </div>
</template>

<script>
import CategoryTable from "./CategoryTable.vue";
export default {
  name: "Month",
  props: {
    monthData: Object,
  },
  components: { CategoryTable },
  data: () => ({}),
};
</script>

<style scoped>
.item {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
}
.spending-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
}
@media only screen and (max-width: 1615px) {
    .spending-container {
        display: block;
    }
}

</style>