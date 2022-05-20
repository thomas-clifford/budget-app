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
    }
} 

export default utils;