export const numberThousandSaperator = (num) => {
  if (num == 0) {
    return;
  }
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const formattedNumber = formatter.format(num);
  return formattedNumber;
};
