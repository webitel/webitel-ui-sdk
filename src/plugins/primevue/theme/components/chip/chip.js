import { ChipScheme } from '@webitel/styleguide/component-schemes';

const generateCustomColorCss = ({ colorName, dt }) => `
        .p-chip-${colorName} {
            background: ${dt(`chip.${colorName}.background`)};
            color: ${dt(`chip.${colorName}.color`)};
        }

        .p-chip-${colorName} .wt-icon {
            fill: ${dt(`chip.${colorName}.iconColor`)};
        }

        .p-chip-${colorName} .wt-icon:hover {
            fill: ${dt(`chip.${colorName}.iconHoverColor`)};
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

        .p-chip {
            white-space: nowrap;
            min-width: 40px;
            justify-content: center;
        }

        .p-chip .wt-icon {
            width: ${dt(`chip.removeIcon.size`)};
            height: ${dt(`chip.removeIcon.size`)};
        }
        `,
};

export default chip;
