<template>
  <div id="home-container">
    <div @click="resetData()">
      <Header />
    </div>
    <div class="body">
      <div v-if="selectedMonth === null">
        <p class="text-h6">Year</p>
        <select
          v-model="selectedYear"
          @change="changeYear(`Home-${selectedYear}`)"
        >
          <option
            v-for="year in years"
            :key="year"
            :value="year"
            class="yearSelect"
          >
            {{ year }}
          </option>
        </select>
        <p class="text-h6 pt-5">Month</p>
        <div id="months-container">
          <div
            v-for="(month, index) in months"
            :key="index"
            class="month"
            @click="showMonth(month)"
            :style="{
              backgroundColor:
                month.balance < 0
                  ? 'var(--v-secondary-base)'
                  : 'var(--v-primary-base)',
            }"
          >
            <p class="text-h6 mb-0">{{ month.name }}</p>
            <p>{{ getMoneyFormat(month.balance) }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <Month :monthData="selectedMonth" />
      </div>

      <p id="about" v-on:click="navigateTo('About')">ABOUT</p>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Month from "../components/Month.vue";
import { USERS } from "../firebase-config";
import utils from '../shared/utils.js';

export default {
  name: "Home",
  components: { Header, Month },
  data: () => ({
    months: [],
    yearlySummary: [],
    years: [],
    selectedYear: 0,
    selectedMonth: null,
  }),
  mounted() {
    this.getUserData();
  },
  methods: {
    navigateTo(path) {
      this.$router.replace({ name: `${path}` }).catch(() => {});
      this.selectedYear = parseInt(
        this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1)
      );
    },
    async getUserData() {
      await USERS.doc("tclifford5225@gmail.com")
        .get()
        .then((doc) => {
          const data = doc.data();
          this.yearlySummary = data.years;
        });
      for (const year of this.yearlySummary) {
        this.years.push(year.name);
      }
      this.getYearData();
    },
    changeYear(route) {
      if (!this.selectedYear) {
        this.selectedYear = this.years[0];
        route = 'Home-' + this.selectedYear;
      }

      this.navigateTo(route);
      this.getYearData();
    },
    getYearData() {
      this.selectedYear = parseInt(
        this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1)
      );
      for (const year of this.yearlySummary) {
        if (year.name === this.selectedYear) {
          this.months = year.months;
        }
      }
    },
    getMoneyFormat: utils.getMoneyFormat,
    showMonth(month) {
      this.selectedMonth = month;
      this.$router
        .replace({ path: `/home/${this.selectedYear}/${this.selectedMonth.name}` })
        .catch(() => {});
    },
    async resetData() {
      for (var year of this.yearlySummary) {
        for (var month of year.months) {
          month.balance = 0;
          for (var assetCategory of month.assetCategories) {
            month.balance += parseFloat(assetCategory.total);
          }
          for (var spendingCategory of month.spendingCategories) {
            month.balance -= parseFloat(spendingCategory.total);
          }
          year.balance += month.balance;
        }
      }
      await USERS.doc("tclifford5225@gmail.com").set({
        years: this.yearlySummary
      })
      this.selectedMonth = null;
      this.selectedYear = parseInt(
        this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1)
      );
    },
  },
};
</script>
<style scoped>
#home-container {
  text-align: center;
  width: 80%;
  margin: 0 auto;
}
.body {
  padding-top: 130px;
}
#about {
  color: var(--v-primary-base);
}
#about:hover {
  cursor: pointer;
  color: black;
}
#about:active {
  color: var(--v-primary-base);
}
select {
  cursor: pointer;
  width: min(100%, 1307px);
  border: 1px solid black;
  text-align: center;
  min-height: 50px;
  border-radius: 10px;
}
select:hover {
  border: 1px solid var(--v-accent-base);
}
#months-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 425px));
  width: min(100%, 1307px);
  margin: 0 auto;
  padding-bottom: 30px;
}
.month {
  margin: auto;
  width: 100%;
  padding-top: 15px;
  text-align: center;
  border-radius: 10px;
  min-height: 100px;
}
.month:hover {
  cursor: pointer;
  transform: scale(0.98);
}
.month:active {
  cursor: pointer;
  background-color: var(--v-accent-base) !important;
  transform: scale(0.95);
}
</style>
