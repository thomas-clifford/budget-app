<template>
  <div>
    <div class="month-header">
      <div class="month">
        <p class="text-h4 pr-3">{{ monthData.name.toUpperCase() }}</p>
        <p :class="positiveBalance ? 'primary--text text-h4' : 'secondary--text text-h4'">{{getMoneyFormat(monthData.balance)}}</p>
      </div>
      <p>Projected Account Balance: {{getMoneyFormat(totalProjected)}}</p>
      <p>Actual Account Balance: {{getMoneyFormat(totalActual)}}</p>
      <p>Difference: {{getMoneyFormat(totalProjected - totalActual)}}</p>
    </div>
    
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
import utils from '../shared/utils.js';
export default {
  name: "Month",
  props: {
    monthData: Object,
  },
  components: { CategoryTable },
  data: () => ({
    positiveBalance: true,
    totalProjected: 0,
    totalActual: 0,
    difference: 0
  }),
  mounted() {
    this.updateData();
    this.monthData.balance < 0 ? this.positiveBalance = false : this.positiveBalance = true;
  },
  methods: {
    getMoneyFormat: utils.getMoneyFormat,
    updateData() {
      var projectedAssetAmount = 0;
      var actualAssetAmount = 0;
      var projectedSpendingAmount = 0;
      var actualSpendingAmount = 0;
      for (var a of this.monthData.assetCategories) {
        for (var assetCategory of a.subcategories) {
          projectedAssetAmount += parseFloat(assetCategory.projectedAmount);
          actualAssetAmount += parseFloat(assetCategory.actualAmount);
        }
      }
      for (var s of this.monthData.spendingCategories) {
        for (var spendingCategory of s.subcategories) {
          projectedSpendingAmount += parseFloat(spendingCategory.projectedAmount)
          actualSpendingAmount += parseFloat(spendingCategory.actualAmount);
        }
      }
      this.totalProjected = projectedAssetAmount - projectedSpendingAmount;
      this.totalActual = actualAssetAmount - actualSpendingAmount;
      this.difference = this.totalProjected - this.totalActual
      this.monthData.balance = this.totalActual;
    }
  }
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
.month-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
}
.month {
  display: flex;
  grid-column: 1 / 4;
}

@media only screen and (max-width: 1615px) {
    .spending-container {
        display: block;
    }
}

</style>