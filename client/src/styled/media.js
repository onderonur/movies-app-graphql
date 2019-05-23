// OK
import { css } from "styled-components";

export const breakpoints = {
  xl: 1920,
  lg: 1280,
  md: 960,
  sm: 600
};

// Iterate through the sizes and create a media template
const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default media;
