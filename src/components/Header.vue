<template>
  <div id="header" fixed="top">
    <div id="title">
      <p
        class="pt-7 font-weight-medium text-h4"
        v-on:click="navigateHome()"
        text-center
      >
        Budget App
      </p>
    </div>

    <v-menu offset-y rounded="md">
      <template v-slot:activator="{ on, attrs }">
        <v-icon id="menu-icon" x-large v-bind="attrs" v-on="on">mdi-menu</v-icon>
      </template>
      <v-list>
        <v-list-item
          v-for="(option, index) in menuOptions"
          :key="index"
          class="menu-option"
          @click="executeOption(option)"
        >
          <v-list-item-title>{{ option.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    menuOptions: [
      {title: "Create Monthly Template"}
    ]
  }),
  methods: {
    navigateHome() {
      var path = this.$route.path.substring(0, this.$route.path.lastIndexOf('/'))
      if (!path) {
        path = "/home"
      }
      this.$router.replace({ path: `${path}` }).catch(() => {});
    },
    executeOption(option) {
      if (option.title === this.menuOptions[0].title) {
        console.log(this.$route.path)
        this.$router.replace({ path: "/budget-template" }).catch(() => {});
      }
      this.$router.go(0);
    }
  },
};
</script>

<style>
#header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 200;
  height: 100px;
  background-color: white;
  border-bottom: 1px solid var(--v-primary-base);
  display: grid;
  place-items: center;
}
@media only screen and (max-width: 600px) {
  #header {
    text-align: left;
    padding-left: 20px;
    display: block;
  }
}
#title {
  color: var(--v-primary-base);
  max-width: 200px;
}
#title:hover {
  cursor: pointer;
  color: black;
}
#title:active {
  color: var(--v-primary-base);
}
#menu-icon {
  position: absolute;
  top: 30px;
  right: 50px;
}
#menu-icon:hover {
  cursor: pointer;
}
.menu-option:hover {
  cursor: pointer;
  background-color: var(--v-accent-lighten3);
}
</style>