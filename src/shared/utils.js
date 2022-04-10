const utils = {
    getMoneyFormat(amount) {
        var formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
    
        return formatter.format(amount);
    }
} 

export default utils;