import { ButtonScheme } from '@webitel/styleguide/component-schemes';

const generateCustomColorCss = ({ colorName, dt }) => `
        .p-button-${colorName} {
            background: ${dt(`button.${colorName}.background`)};
            color: ${dt(`button.${colorName}.color`)};
        }
        .p-button-${colorName}:not(:disabled):hover {
            background: ${dt(`button.${colorName}.hoverBackground`)};
            color: ${dt(`button.${colorName}.hoverColor`)};
        }
        .p-button-${colorName}:not(:disabled):active {
            background: ${dt(`button.${colorName}.activeBackground`)};
            color: ${dt(`button.${colorName}.activeColor`)};
        }
`;

const button = {
  ...ButtonScheme.sizes,
  colorScheme: ButtonScheme.colorScheme,

  extend: {
    transfer: {
      background: '{black}',
      hoverBackground: '{black}',
      color: '{black}',
      hoverColor: '{black}',
    },
  },

  // Rewrite the default button styles in the theme here:
  // For customize the button styles you need write css styles for classes
  css: ({ dt }) => `
        ${generateCustomColorCss({ colorName: 'transfer', dt })}
        ${generateCustomColorCss({ colorName: 'error', dt })}
        ${generateCustomColorCss({ colorName: 'job', dt })}
        .p-button:disabled {
          background: ${dt(`button.disabled.background`)};
          color: ${dt(`button.disabled.color`)};
          opacity: 1;
        }
        .p-button-loading .wt-button__contents {
            visibility: hidden;
        }
        .p-button .wt-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .p-button {
            min-width: 90px;
            font-weight: 600;
            font-size: 12px;
            line-height: 24px;
            border: none;
            font-family: "Montserrat", monospace;
            text-transform: uppercase;
        }
        .p-button.p-button--width-by-content {
            min-width: 0;
        }
        .p-button.p-button--wide {
            width: 100%;
        }
        .p-button.p-button--contains-icon {
            line-height: 0;
        }
        .p-button.p-button--loading {
            pointer-events: none;
        }
        .p-button:hover {
            border: none;
        }
        .p-button:not(:disabled):hover {
            border: none;
        }
        `,
};

export default button;
