export const toCurrency = (amount: number | string, currency: string = "NGN"): string => {
    if (typeof (amount) != "number") return amount
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
    }).format(amount);
};

export const formatShortDate = (dateString: string): string => {
    if(!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
};