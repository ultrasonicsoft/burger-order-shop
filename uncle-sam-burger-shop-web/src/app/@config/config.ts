export const AppConfig = {
    OrderIdLength: 8,
    ContactIdLength: 24,
    TaxValue: 10,
    getNewOrderId: () => {
        return URL.createObjectURL(new Blob([])).slice(-AppConfig.OrderIdLength);
    },

}