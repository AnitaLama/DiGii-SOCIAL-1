import { css } from 'emotion';

const sizes = {
  xs360: 360,
  xs400: 400,
  xs480: 480,
  s600: 600,
  s720: 720,
  s840: 840,
  s960: 960,
  m1024: 1024,
  m1280: 1280,
  l1440: 1440,
  l1600: 1600,
  xl1920: 1920
};

// iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
// End Media Queries

const boxShadow = () => `
box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
`;

const resetList = () => `
  padding: 0;
  margin: 0;
  list-style: none;
  list-style-image: none;
`;

const visuallyHidden = () => `
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
`;

// reset margin and padding
const resetMarginPadding = () => `
  margin: 0;
  padding: 0
`;

// use the full viewport
const fullViewPort = () => `
  width: 100vw;
  height: 100vh;
`;

// center the contents
const centerContent = () => `
  margin:auto
`;

// Uses the traditional absolute centering of items.
const absoluteFixed = () => `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const absoluteCentering = () => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

// uses flex box absolute cenering
// @direction: allows you to toggle between 'horizontal' vs 'vertical.
const flexCentering = (direction = 'row') => `
  display: flex;
  flex-direction: ${direction};
  align-items: center;
  justify-content: center;
`;

// Use to create square containers and widgets.
const square = (size, unit = 'px') => `
  width: ${size}${unit};
  height: ${size}${unit};
`;

// Use to create circular containers and widgets.
const circle = radius => `
  ${square(radius)};
  border-radius: 50%;
`;

// Use to create simple containers based on width and height, default unit is 'px' but can be used with
const size = (width, height, unit = 'px') => `
  width: ${width}${unit};
  height: ${height}${unit};
`;

// A simple flexbox mixin to change direction
const flex = (direction = 'row', wrap = 'nowrap') => `
  display: flex;
  flex-direction: ${direction};
  flex-wrap: ${wrap};
`;

const grid = (columns, columnSize, gap = 0) => `
  display: grid;
  grid-gap: ${gap}px;
  grid-template-columns: repeat(${columns}, ${columnSize});
`;

export {
  sizes,
  media,
  boxShadow,
  absoluteFixed,
  centerContent,
  absoluteCentering,
  visuallyHidden,
  flexCentering,
  circle,
  square,
  resetMarginPadding,
  fullViewPort,
  size,
  flex,
  resetList,
  grid
};
