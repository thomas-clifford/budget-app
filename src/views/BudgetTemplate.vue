<template>
  <div id="template-container">
    <Header />
    <div class="body">
      <p class="text-h4">Monthly Template</p>
      <v-btn color="primary" class="mb-5" @click="saveTemplate">Save Template</v-btn>
      <p class="text-h4">Assets</p>
      <CategoryTable
        v-for="(category, index) in templateData.assetCategories"
        :key="index"
        :category="category"
      />
      <v-dialog
        v-model="assetDialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="new-category mb-5" v-on="on" v-bind="attrs">
            <p class="text-h5">New Asset Category</p>
          </div>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Asset Category Name
          </v-card-title>

          <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="categoryName"
                    label="Category Name"
                    required
                  ></v-text-field>
                </v-container>
              </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn
              color="secondary"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="addAssetCategory()"
            >
              Add Category
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <p class="text-h4 pt-5">Spending</p>
      <div class="spending-container">
        <CategoryTable
          v-for="(category, index) in templateData.spendingCategories"
          :key="index"
          :category="category"
        />
      </div>
      <v-dialog
          v-model="spendingDialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="new-category mb-5" v-on="on" v-bind="attrs">
              <p class="text-h5">New Spending Category</p>
            </div>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Spending Category Name
            </v-card-title>

            <v-card-text>
                  <v-container>
                    <v-text-field
                      v-model="categoryName"
                      label="Category Name"
                      required
                    ></v-text-field>
                  </v-container>
                </v-card-text>

            <v-divider></v-divider>
            
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn
                color="secondary"
                text
                @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="addSpendingCategory()"
              >
                Add Category
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-btn color="primary" class="mb-5" @click="saveTemplate">Save Template</v-btn>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import CategoryTable from "../components/CategoryTable.vue";
import { USERS } from "../firebase-config";
export default {
  name: "BudgetTemplate",
  components: { Header, CategoryTable },
  data: () => ({
    yearlySummary: [],
    templateData: {
      name: "",
      assetCategories: [],
      spendingCategories: [],
    },
    assetDialog: false,
    spendingDialog: false,
    categoryName: ''
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
    addAssetCategory() {
      this.assetDialog = false;
      this.templateData.assetCategories = [...this.templateData.assetCategories, {name: this.categoryName, subcategories: [], total: 0}]
      this.categoryName = '';
    },
    addSpendingCategory() {
      this.spendingDialog = false;
      this.templateData.spendingCategories = [...this.templateData.spendingCategories, {name: this.categoryName, subcategories: []}]
      this.categoryName = '';
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
.new-category {
  display: grid;
  place-items: center;
  min-height: 10em;
  border-radius: 5px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='rgb(102,187,106)' stroke-width='3' stroke-dasharray='6%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
}
.new-category:hover{
  background-color: var(--v-primary-base);
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.new-category:hover .plusIcon{
  background-color: rgb(19, 53, 118);
  color: rgb(255, 255, 255);
}
@media only screen and (max-width: 1615px) {
    .spending-container {
        display: block;
    }
}
</style>