/**
 * Copyright Chance Digital 2019
 * Copyright IBM Corp. 2018, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const black = '#1f1f1f';
export const black100 = black;

export const white = '#ffffff';
export const white0 = white;

export const yellow10 = '#F7DEAC';
export const yellow20 = '#FCCA7A';
export const yellow30 = '#EAAC2F';
export const yellow40 = '#B08123';
export const yellow50 = '#755618';
export const yellow60 = '#3A2B0C';
export const yellow = {
  10: yellow10,
  20: yellow20,
  30: yellow30,
  40: yellow40,
  50: yellow50,
  60: yellow60,
};

export const red10 = '#F1BEB0';
export const red20 = '#E59383';
export const red30 = '#DC5C3A';
export const red40 = '#A5452C';
export const red50 = '#6E2E1D';
export const red60 = '#37170E';
export const red = {
  10: red10,
  20: red20,
  30: red30,
  40: red40,
  50: red50,
  60: red60,
};

export const blue10 = '#BBD1DA';
export const blue20 = '#8FB4C1';
export const blue30 = '#558CA3';
export const blue40 = '#40697A';
export const blue50 = '#2B4652';
export const blue60 = '#152329';
export const blue = {
  10: blue10,
  20: blue20,
  30: blue30,
  40: blue40,
  50: blue50,
  60: blue60,
};

export const green10 = '#C9E5B9';
export const green20 = '#A9D18F';
export const green30 = '#79BD4F';
export const green40 = '#5B8E3B';
export const green50 = '#3D5F28';
export const green60 = '#1E2F14';
export const green = {
  10: green10,
  20: green20,
  30: green30,
  40: green40,
  50: green50,
  60: green60,
};

export const gray10 = '#EFEFEF';
export const gray20 = '#C8C8C8';
export const gray30 = '#9E9E9E';
export const gray40 = '#757575';
export const gray50 = '#585858';
export const gray60 = '#3B3B3B';
export const gray = {
  10: gray10,
  20: gray20,
  30: gray30,
  40: gray40,
  50: gray50,
  60: gray60,
};

const colorMap = {
  black: {
    100: black,
  },
  white: {
    0: white,
  },
  green,
  blue,
  red,
  yellow,
  gray,
};

// eslint-disable-next-line no-unused-vars
const darkMode = Object.keys(colorMap).reduce((prev, cur) => {
  const curObj = colorMap[cur];
  console.log(curObj);
  const scaleKeys = Object.keys(curObj)
    .map(Number)
    .sort();
  let count = 0;
  const flipped = scaleKeys.reduce((scale, p, index) => {
    count = count + 1;
    return {
      ...p,
      [scale]: curObj[scaleKeys[scaleKeys.length - 1 - count]],
    };
  }, {});
  return {
    ...prev,
    [cur]: flipped,
  };
}, {});

export const colors = {
  black: {
    100: black,
  },
  white: {
    0: white,
  },
  green,
  blue,
  red,
  yellow,
  gray,
};
