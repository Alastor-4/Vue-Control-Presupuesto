export const formatQuantity = (quantity) => {
    return Number(quantity).toLocaleString("es-Us", {
        style: "currency",
        currency: "USD",
    });
};