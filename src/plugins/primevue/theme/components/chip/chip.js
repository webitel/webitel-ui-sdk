import { ChipScheme } from '@webitel/styleguide/component-schemes';

const generateCustomColorCss = ({ colorName, dt }) => `
        .p-chip-${colorName} {
            background: ${dt(`chip.${colorName}.background`)};
            color: ${dt(`chip.${colorName}.color`)};
        }

        .p-chip .wt-icon {
            width: ${dt(`chip.removeIcon.size`)};
            height: ${dt(`chip.removeIcon.size`)};
        }

        .p-chip-${colorName} .wt-icon .wt-icon__icon {
            fill: ${dt(`chip.${colorName}.iconColor`)};
        }

        .p-chip .wt-icon:hover .wt-icon__icon {
            fill: ${dt(`chip.removeIcon.hoverColor`)};
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
