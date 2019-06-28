const calculateRem = pxSize => {
  const remSize = pxSize / 16;
  return `${remSize * 1}rem`;
};

const fontSize = pxSize => `
  font-size: ${pxSize}px;
  font-size: ${calculateRem(pxSize)}
`;

const fontFilson = () => `
  font-family:"Filson Soft";
`;

const fontWeight = weight => `
  font-weight : ${weight}
`;
export {
  calculateRem, fontSize, fontFilson, fontWeight
};
