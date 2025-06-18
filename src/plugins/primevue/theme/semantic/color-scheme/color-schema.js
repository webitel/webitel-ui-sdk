import darkColor from './dark-color.js';
import lightColor from './light-color.js';
import palette from './palette.js';

const colorScheme = {
  light: {
    ...palette,
    ...lightColor,
  },
  dark: {
    ...palette,
    ...darkColor,
  },
};

export default colorScheme;
