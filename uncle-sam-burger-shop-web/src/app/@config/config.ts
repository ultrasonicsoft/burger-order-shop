export const AppConfig = {
    OrderIdLength: 8,
    getNewOrderId: () => {
        return URL.createObjectURL(new Blob([])).slice(-AppConfig.OrderIdLength);
    }
}