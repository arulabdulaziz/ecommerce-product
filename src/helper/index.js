export function convertMoney(price) {
  let thousand = price.toString().split("").reverse().join("");
  thousand = thousand.match(/\d{1,3}/g);
  thousand = thousand.join(".").split("").reverse().join("");
  return `${price < 0 ? "-" : ""}Rp.${thousand},-`;
}
