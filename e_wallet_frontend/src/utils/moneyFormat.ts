const moneyFormat = (money: number) => {
  let moneyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(money ? money : 1);
  return moneyFormatter;
};

export { moneyFormat };
