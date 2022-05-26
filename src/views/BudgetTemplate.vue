<template>
  <div id="template-container" :key="templateKey">
    <Header />
    <div class="body">
      <p class="text-h4">Monthly Template</p>
      <v-btn color="primary" class="mb-5" @click="saveTemplate">Save Template</v-btn>
      <p class="text-h4">Assets</p>
      <CategoryTable
        v-for="(category, index) in templateData.assetCategories"
        :key="index"
        :ind="index"
        :category="category"
        @change-values="updateData(templateData)"
        @delete-category="deleteCategory(templateData, $event)"
        @render-month="render"
      />

      <NewCategoryTableBtn :categoryType="'Asset'" @add-category="addAssetCategory"/>

      <p class="text-h4 pt-5">Spending</p>
      <div class="spending-container">
        <CategoryTable
          v-for="(category, index) in templateData.spendingCategories"
          :key="index"
          :ind="index"
          :category="category"
          @change-values="updateData(templateData)"
          @delete-category="deleteCategory(templateData, $event)"
          @render-month="render"
        />
      </div>

      <NewCategoryTableBtn :categoryType="'Spending'" @add-category="addSpendingCategory"/>

      <v-btn color="primary" class="mb-5" @click="saveTemplate">Save Template</v-btn>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import CategoryTable from "../components/CategoryTable.vue";
import { USERS } from "../firebase-config";
import NewCategoryTableBtn from "../components/NewCategoryTableBtn.vue"
import utils from "../shared/utils"
export default {
  name: "BudgetTemplate",
  components: { Header, CategoryTable, NewCategoryTableBtn },
  data: () => ({
    yearlySummary: [],
    templateData: {
      name: "",
      assetCategories: [],
      spendingCategories: [],
      balance: 0,
    },
    templateKey: 0
  }),
  mounted() {
    this.getUserData();
  },
  methods: {
    async saveTemplate() {
      await USERS.doc("tclifford5225@gmail.com").update({
        template: this.templateData,
      });
    },
    async getUserData() {
      await USERS.doc("tclifford5225@gmail.com")
        .get()
        .then((doc) => {
          const data = doc.data();
          this.templateData = data.template;
        });
    },
    addAssetCategory(name) {
      this.templateData.assetCategories = [...this.templateData.assetCategories, {name: name, subcategories: [], total: 0}]
    },
    addSpendingCategory(name) {
      this.templateData.spendingCategories = [...this.templateData.spendingCategories, {name: name, subcategories: []}]
    },
    updateData: utils.updateData,
    deleteCategory: utils.deleteCategory,
    render() {
      this.templateKey += 1;
    }
  },
};
</script>

<style>
#template-container {
  text-align: center;
  width: 80%;
  margin: 0 auto;
}
.body {
  padding-top: 130px;
}
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