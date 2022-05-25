const utils = {
    getMoneyFormat(amount) {
        var formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
    
        return formatter.format(amount);
    },
    getMonthNumber(month) {
        return new Date(Date.parse(month +" 1, 2022")).getMonth();
    },
    getMonthName(number) {
        switch(number) {
            case 0: return "january";
            case 1: return "february";
            case 2: return "march";
            case 3: return "april";
            case 4: return "may";
            case 5: return "june";
            case 6: return "july";
            case 7: return "august";
            case 8: return "september";
            case 9: return "october";
            case 10: return "november";
            case 11: return "december";
        }
    },
    updateData(month) {
      var projectedAssetAmount = 0;
      var actualAssetAmount = 0;
      var projectedSpendingAmount = 0;
      var actualSpendingAmount = 0;
      for (var a of month.assetCategories) {
        for (var assetCategory of a.subcategories) {
          projectedAssetAmount += parseFloat(assetCategory.projectedAmount);
          actualAssetAmount += parseFloat(assetCategory.actualAmount);
        }
      }
      for (var s of month.spendingCategories) {
        for (var spendingCategory of s.subcategories) {
          projectedSpendingAmount += parseFloat(spendingCategory.projectedAmount)
          actualSpendingAmount += parseFloat(spendingCategory.actualAmount);
        }
      }
      this.totalProjected = projectedAssetAmount - projectedSpendingAmount;
      this.totalActual = actualAssetAmount - actualSpendingAmount;
      this.difference = this.totalProjected - this.totalActual
      month.balance = this.totalActual;
      month.balance < 0 ? this.positiveBalance = false : this.positiveBalance = true;
    },
    deleteCategory(monthData, table) {
      var isAsset = false;
      var isSpending = false;
      for (var a of monthData.assetCategories) {
        if (a === table.category) {
          isAsset = true;
        }
      }
      for (var s of monthData.spendingCategories) {
        if (s === table.category) {
          isSpending = true;
        }
      }
      if (isAsset) {
        monthData.assetCategories.splice(table.ind, 1);
      } else if (isSpending) {
        monthData.spendingCategories.splice(table.ind, 1);
      }
      this.$emit("render-month");
      this.updateData(monthData);
    },
    render() {
      this.$emit("render-month");
    }
} 

export default utils;