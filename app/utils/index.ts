/**
 * Reduces address string to first and last 4 letters
 */
export const shortenAddress = (address: string) => {
  if (address && address.length >= 8) {
    return `${address.slice(0, 7)}...${address.slice(
      address.length - 5,
      address.length
    )}`;
  } else {
    return address;
  }
};

/**
 * Converts int to base k, m, b, t, etc
 */
export const kFormatter = (num: number, digits?: number) => {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (
    (num / si[i].value).toFixed(digits ? digits : 0).replace(rx, "$1") +
    si[i].symbol
  );
};
