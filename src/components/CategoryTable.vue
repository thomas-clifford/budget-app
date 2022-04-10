<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tableCategories"
      sort-by="calories"
      class="elevation-4 mb-5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ category.name }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container v-if="formTitle === 'New Item'">
                  <v-text-field
                    v-model="editedItem.name"
                    :label="category.name + ' Category'"
                  ></v-text-field>
                </v-container>
                <v-container v-else>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.name"
                        :label="category.name + ' Category'"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.projectedAmount"
                        label="Projected Amount"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.actualAmount"
                        label="Actual Amount"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="primary" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogAdd" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Add Amounts</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.name"
                        :label="category.name + ' Category'"
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.projectedAmount"
                        label="Projected Amount"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.actualAmount"
                        label="Actual Amount"
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="addProjectedAmount"
                        label="Projected Amount"
                      ></v-text-field>
                      <v-btn width="100%" @click="addToTotal()">+</v-btn>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="addActualAmount"
                        label="Actual Amount"
                      ></v-text-field>
                      <v-btn width="100%" @click="addToTotal()">+</v-btn>
                    </v-col>
                  </v-row>

                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="primary" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="primary" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="addAmounts(item)"> mdi-plus-box </v-icon>
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import utils from '../shared/utils.js';
export default {
  name: "CategoryTable",
  props: {
    category: Object,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogAdd: false,
    headers: [
      {
        text: "Item",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Projected Amount", value: "projectedAmountMoney" },
      { text: "Actual Amount", value: "actualAmountMoney" },
      { text: "Difference", value: "differenceMoney" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    tableCategories: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      projectedAmount: 0,
      actualAmount: 0,
      projectedAmountMoney: '$0.00',
      actualAmountMoney: '$0.00',
      differenceMoney: '$0.00',
    },
    defaultItem: {
      name: "",
      projectedAmount: 0,
      actualAmount: 0,
      projectedAmountMoney: '$0.00',
      actualAmountMoney: '$0.00',
      differenceMoney: '$0.00',
    },
    addProjectedAmount: 0,
    addActualAmount: 0,
    savePreviousActualAmount: 0
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.tableCategories = this.category.subcategories;
      var total = 0;
      if (this.tableCategories) {
          for (var category of this.tableCategories) {
            var actualAmount = category.actualAmount;
            var projectedAmount = category.projectedAmount;
            category.difference = actualAmount - projectedAmount

            category.actualAmountMoney = this.getMoneyFormat(category.actualAmount);
            category.projectedAmountMoney = this.getMoneyFormat(category.projectedAmount);
            category.differenceMoney = this.getMoneyFormat(category.difference);

            total = parseFloat(total) + parseFloat(actualAmount);
        }
        this.category.total = parseFloat(total);
      }
      
    },
    addAmounts(item) {
        this.editedIndex = this.tableCategories.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogAdd = true;
    },

    editItem(item) {
      this.editedIndex = this.tableCategories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.tableCategories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.category.total -= parseFloat(this.editedItem.actualAmount);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.tableCategories.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.dialogAdd = false;
      this.addProjectedAmount = 0;
      this.addActualAmount = 0;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    addToTotal() {
        this.editedItem.projectedAmount = parseFloat(this.editedItem.projectedAmount) + parseFloat(this.addProjectedAmount);
        this.editedItem.actualAmount = parseFloat(this.editedItem.actualAmount) + parseFloat(this.addActualAmount);
        this.editedItem.difference = parseFloat(this.editedItem.actualAmount) - parseFloat(this.editedItem.projectedAmount);
        this.addProjectedAmount = 0;
        this.addActualAmount = 0;
    },

    save() {
      this.editedItem.difference = this.editedItem.actualAmount - this.editedItem.projectedAmount;
      this.savePreviousActualAmount = this.editedItem.actualAmountMoney.substring(1);
      this.editedItem.actualAmountMoney = this.getMoneyFormat(this.editedItem.actualAmount);
      this.editedItem.projectedAmountMoney = this.getMoneyFormat(this.editedItem.projectedAmount);
      this.editedItem.differenceMoney = this.getMoneyFormat(this.editedItem.difference);
      if (this.formTitle === "Edit Item") {
        this.category.total -= parseFloat(this.savePreviousActualAmount);
      }
      this.category.total = parseFloat(this.category.total) + parseFloat(this.editedItem.actualAmount);
      
      if (this.editedIndex > -1) {
        Object.assign(this.tableCategories[this.editedIndex], this.editedItem);
      } else {
        this.tableCategories.push(this.editedItem);
      }
      this.close();
    },
    getMoneyFormat: utils.getMoneyFormat,
  },
};
</script>
<style scoped>
</style>