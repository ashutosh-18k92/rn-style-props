const hexMap = { a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 };
const codes = "0123456789abcdef".split("");

const invertBit = (bit) => hexMap.f - bit;

const hexToDec = (h) => {
  let x = Number(h);
  return isNaN(x) ? hexMap[h] : x;
};

const decToHex = (d) => {
  let x = Number(d);
  return x < 10 ? x : Object.keys(hexMap).find((key) => hexMap[key] === x);
};

const colorToBits = (color) => color.replace("#", "").split("");

const bitsToColor = (bitsArr) => "#" + bitsArr.join("");

const hexComplement = (bits) => bits.map(hexToDec).map(invertBit).map(decToHex);

//in-place sum
const sumOfHexBits = (bits) => bits.map(hexToDec).reduce((acc, i) => acc + i, 0);

export const Saturation = { LOW: "Low", MEDIUM: "Medium", HIGH: "High" };
const getSaturationLevel = (level) => {
  let saturation;
  switch (level) {
    case Saturation.LOW:
      saturation = "258bef".split(""); //[2, 5, 8, "b", "e",'f'];
      break;
    case Saturation.MEDIUM:
      saturation = "147ad".split(""); // [1, 4, 7, "a", "d"];
      break;
    case Saturation.HIGH:
      saturation = "0369c".split(""); //[0, 3, 6, 9, "c"];
      break;
  }
  return saturation;
};

/**
 * The ides here is to first find the family of the color that is the
 * nearest decendent which can be Red, Green and Blue,which can be assessed
 * by looking which of the RGB bit pair is highest. Care of the mother.
 * then we find what is the second high in that, consider this Care of the father
 * then intermix of these two care will be the lowest one we have to play there
 * to acieve more combination of that extra care.
 * Then keeping the family as primary Color
 * @param {*} bgColor
 * @returns
 */
export const expandRange = (bgColor, level) => {
  const splitRGB = (color) => {
    let bits = colorToBits(color);
    return [bits.splice(0, 2), bits.splice(0, 2), bits.splice(0, 2)];
  };
  const RGB = "RGB".split("");
  const grid = [];
  const rgb = splitRGB(bgColor);
  const rgbSum = rgb.map(sumOfHexBits);

  //reverse
  const rgbSorted = [...rgbSum].sort((a, b) => (a <= b ? 1 : -1));
  const primaryIndex = rgbSum.indexOf(rgbSorted[0]); //max
  const secondaryIndex = rgbSum.indexOf(rgbSorted[1]); //second max
  const pc = rgb[primaryIndex].join("");
  const sc = rgb[secondaryIndex].join("");
  const saturation = getSaturationLevel(level);

  let row = [];
  saturation.forEach((c) => {
    let color;
    switch (RGB[primaryIndex]) {
      case "R":
        color = `#${pc}${sc}${c}${c}`;
        break;
      case "G":
        color = `#${sc}${pc}${c}${c}`;
        break;
      case "B":
        color = `#${sc}${c}${c}${pc}`;
        break;
    }
    row.push(color);
  });
  grid.push(row);

  return grid;
};

export const defaultColors = () => {
  const pc = getSaturationLevel(Saturation.LOW);
  const grid = [];
  pc.forEach((c1) => {
    pc.forEach((c2) => {
      let row = [];
      pc.forEach((c3) => {
        row.push("#" + [c1, c1, c2, c2, c3, c3].join(""));
      });
      grid.push(row);
    });
  });
  return grid;
};

export const getShadesOfBgColor = (color, level = Saturation.LOW) => {
  if (!color) return defaultColors(level);
  return expandRange(color, level);
};

/**
 * Algorithm to map text color with a background color
 * @param {*} color
 * @returns
 */
export const getOptimalTextColor = (color) => {
  if (!color) return "#cccccc";
  const bits = colorToBits(color);

  const invertHighs = (bits) => {
    const hdc = bits.map(hexToDec);
    const mx = hdc.reduce((max, i) => (i > max ? i : max), -1);
    const mn = hdc.reduce((min, i) => (i < min ? i : min), 16);
    const invertBit = (bit) => hexMap.f - bit;
    /** invert all */
    return hdc.map(invertBit).map(decToHex);

    /** bit > mx ->invert  bit<mx->invert  mx>bit>mn -> remains same */
    // return hdc.map((i) => (i >= mx || i <= mn ? invertBit(i) : i)).map(decToHex);

    /** bit > mx ->invert  bit<mx->setHigh  mx>bit>mn -> remains same */
    // return hdc.map((i) => (i >= mx ? invertBit(i) : i <= mn ? hexDecMap.f : i)).map(decToHex);
  };

  return bitsToColor(invertHighs(bits));
  /** based on threshold Max is 90 i.e f=15 ffffff white is f*16=90 */
  let hsum = sumOfHexBits(bits);
  let complement = hexComplement(bits);
  // return hsum <= 51 ? "#ffffff" : hexArrayToColor(invertedHigh);
};

export const getShadesOfTextColor = (textColor, level = Saturation.LOW) => {
  const transfrom2Dto1D = (arr2D) => {
    let arr1D = [];
    arr2D.forEach((element) => {
      arr1D = arr1D.concat(element);
    });
    return arr1D;
  };
  const colors = transfrom2Dto1D(expandRange(textColor, level));
  return [textColor, ...colors];
};
