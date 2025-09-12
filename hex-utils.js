const hexDecMap = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};

const codes = "0123456789abcdef".split("");
const [BLACK, RED, GREEN, BLUE, WHITE] = ["000000", "FF0000", "00FF00", "0000FF", "FFFFFF"];

export const expandRange = (col) => {
  const splitRGB = (color) => {
    let bits = toHexBits(color);
    return [bits.splice(0, 2), bits.splice(0, 2), bits.splice(0, 2)];
  };
  const RGB = "RGB".split("");
  const grid = [];
  const rgb = splitRGB(col);
  const rgbSum = rgb.map(sumOfHex);
  //reverse
  const rgbSorted = [...rgbSum].sort((a, b) => (a < b ? 1 : -1)); //reduce((max, i) => (i > max ? i : max), -1);
  const primaryIndex = rgbSum.indexOf(rgbSorted[0]);
  const primaryColor = [rgb[primaryIndex].join("")];
  const firstMixIndex = rgbSum.indexOf(rgbSorted[1]);
  const firstMix = [rgb[firstMixIndex].join("")];
  const secondMix = codes;

  primaryColor.forEach((a) => {
    firstMix.forEach((l) => {
      let row = [];
      secondMix.forEach((c) => {
        let color;
        switch (RGB[primaryIndex]) {
          case "R":
            color = "#" + [a, l, c, c].join("");
            break;
          case "G":
            color = "#" + [l, a, c, c].join("");
            break;
          case "B":
            color = "#" + [l, c, c, a].join("");
            break;
        }
        row.push(color);
      });
      grid.push(row);
    });
  });

  return grid;
};

export const defaultColors = () => {
  const pc = [0, "f"];
  const grid = [];
  pc.forEach((c1) => {
    pc.forEach((c2) => {
      let row = [];
      codes.forEach((c3) => {
        row.push("#" + [c1, c1, c2, c2, c3, c3].join(""));
      });
      grid.push(row);
    });
  });
  return grid;
};

/*const oddShade = (color) => {
  const bits = toHexBits(color);
  const cp1 = codes.slice(codes.indexOf(bits[1]));
  const cp2 = codes.slice(codes.indexOf(bits[3]));
  const cp3 = codes.slice(codes.indexOf(bits[5]));
  const grid = [];
  cp1.forEach((c1) => {
    if (c1 == bits[0]) return;
    cp2.forEach((c2) => {
      if (c2 == bits[2]) return;
      let row = [];
      cp3.forEach((c3) => {
        if (c3 == bits[4]) return;
        row.push("#" + [bits[0], c1, bits[2], c2, bits[4], c3].join(""));
      });
      grid.push(row);
    });
  });
  return grid;
};

const evenShade = (color) => {
  const bits = toHexBits(color);
  const cp1 = codes.slice(codes.indexOf(bits[0]));
  const cp2 = codes.slice(codes.indexOf(bits[2]));
  const cp3 = codes.slice(codes.indexOf(bits[4]));
  const grid = [];
  cp1.forEach((c1) => {
    if (c1 == bits[1]) return;
    cp2.forEach((c2) => {
      if (c2 == bits[3]) return;
      let row = [];
      cp3.forEach((c3) => {
        if (c3 == bits[5]) return;
        row.push("#" + [c1, bits[1], c2, bits[3], c3, bits[5]].join(""));
      });
      grid.push(row);
    });
  });
  return grid;
};*/

export const shades = (color) => {
  if (!color) return defaultColors();
  return expandRange(color);
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

const toHexBits = (color) => color.replace("#", "").split("");
const toHexColor = (bits) => "#" + bits.join("");

/**
 * Get the complement of the color.
 * @param {*} bits
 * @returns
 */
const hexComplement = (bits) => {
  return bits
    .map(hexToDec)
    .map((i) => hexDecMap.f - i)
    .map(decToHex);
};

/**
 * To convert a hex encoded color into sum of its bits in decimal
 * @param {*} bits
 * @returns sum of the color in decimal
 */
const sumOfHex = (bits) => {
  return bits.map(hexToDec).reduce((acc, i) => acc + i, 0);
};

const invertHighs = (bits) => {
  const hdc = bits.map(hexToDec);
  const mx = hdc.reduce((max, i) => (i > max ? i : max), -1);
  const mn = hdc.reduce((min, i) => (i < min ? i : min), 16);

  return hdc.map((i) => (i >= mx ? hexDecMap.f - i : i <= mn ? hexDecMap.f : i)).map(decToHex);
};
/**
 * Algorithm to map text color with a background color
 * @param {*} bgColor
 * @returns
 */
export const mapTextColorAgainstBg = (bgColor) => {
  if(!bgColor) return "#cccccc"
  const bits = toHexBits(bgColor);
  let hsum = sumOfHex(bits);
  let complement = hexComplement(bits);
  let invertedHigh = invertHighs(bits);
  return toHexColor(invertedHigh);
  return hsum <= 51 ? "white" : toHexColor(invertedHigh);
};
