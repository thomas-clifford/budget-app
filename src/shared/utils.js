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
    }
} 

export default utils;