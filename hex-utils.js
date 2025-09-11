const hexDecMap = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};

const hexToDec = (n) => {
  let x = Number(n);
  if (isNaN(x)) x = hexDecMap[n];
  return x;
};

const decToHex = (n) => {
  let x = Number(n);
  if (x < 10) return x;
  return Object.entries(hexDecMap).find(([hex, dec]) => dec === n)[0];
};

const toHexArray = (color) => color.replace("#", "").split("");

/**
 * Get the complement of the color.
 * @param {*} color
 * @returns
 */
export const colorComplement = (color) => {
  let comp = toHexArray(color)
    .map(hexToDec)
    .map((i) => hexDecMap.f - i)
    .map(decToHex);
  return "#" + comp.reverse().join("");
};

/**
 * To convert a hex encoded color into sum of its bits in decimal
 * @param {*} color
 * @returns sum of the color in decimal
 */
export const colorDecSum = (color) => {
  return toHexArray(color)
    .map(hexToDec)
    .reduce((acc, i) => acc + i, 0);
};

/**
 * Algorithm to map text color with a background color
 * @param {*} bgColor 
 * @returns 
 */
export const mapTextColorFor = (bgColor) => {
  const hsum = colorDecSum(bgColor);
  return hsum <= 51 ? "white" : colorComplement(bgColor);
};
