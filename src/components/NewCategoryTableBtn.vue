<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <div class="new-category mb-5" v-on="on" v-bind="attrs">
        <p class="text-h5">New {{ categoryType }} Category</p>
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
            autofocus
            v-on:keyup.enter="addCategory()"
          ></v-text-field>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="addCategory()">
          Add Category
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: "NewCategoryTableBtn",
    props: { 
        categoryType: String,
    },
    data: () => ({
        categoryName: '',
        dialog: false,
    }),
    methods: {
        addCategory() {
            this.$emit("add-category", this.categoryName);
            this.dialog = false;
        }
    }
};
</script>

<style>
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
  transform: scale(1.01);
}
</style>