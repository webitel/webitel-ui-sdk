import { ChipScheme } from '@webitel/styleguide/component-schemes';

const generateCustomColorCss = ({ colorName, dt }) => `
        .p-chip-${colorName} {
            background: ${dt(`chip.${colorName}.background`)};
            color: ${dt(`chip.${colorName}.color`)};
        }

        .p-chip-${colorName} .wt-icon .wt-icon__icon {
            fill: ${dt(`chip.${colorName}.iconColor`)};
            width: ${dt(`chip.icon.size`)};
            height: ${dt(`chip.icon.size`)};
        }
`;

const chip = {
  ...ChipScheme.sizes,
  colorScheme: ChipScheme.colorScheme,

  // Rewrite the default chip styles in the theme here:
  // For customize the chip styles you need write css styles for classes
  css: ({ dt }) => `
        ${generateCustomColorCss({ colorName: 'main', dt })}
        ${generateCustomColorCss({ colorName: 'primary', dt })}
        ${generateCustomColorCss({ colorName: 'secondary', dt })}
        ${generateCustomColorCss({ colorName: 'success', dt })}
        ${generateCustomColorCss({ colorName: 'warning', dt })}
        ${generateCustomColorCss({ colorName: 'error', dt })}
        ${generateCustomColorCss({ colorName: 'transfer', dt })}
        `,
};

export default chip;
