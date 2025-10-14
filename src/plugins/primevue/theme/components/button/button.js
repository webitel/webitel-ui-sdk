import { ButtonScheme } from '@webitel/styleguide/component-schemes';
import { ComponentSize } from '../../../../../enums';

const colors = [
    'primary',
    'secondary',
    'success',
    'warn',
    'error',
    'transfer',
    'job',
    'info'
];

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

        .p-button-outlined.p-button-${colorName} {
            outline-color: ${dt(`button.outlined.${colorName}.borderColor`)};
            background: ${dt(`button.outlined.${colorName}.background`)};
            color: ${dt(`button.outlined.${colorName}.color`)};
        }
        .p-button-outlined.p-button-${colorName}:not(:disabled):hover {
            outline-color: ${dt(`button.outlined.${colorName}.borderColor`)};
            background: ${dt(`button.outlined.${colorName}.hoverBackground`)};
        }
        .p-button-outlined.p-button-${colorName}:not(:disabled):active {
            background: ${dt(`button.outlined.${colorName}.activeBackground`)};
            color: ${dt(`button.outlined.${colorName}.activeColor`)};
        }

        .p-button-text.p-button-${colorName} {
            background: ${dt(`button.text.${colorName}.background`)};
            color: ${dt(`button.text.${colorName}.color`)};
        }
        .p-button-text.p-button-${colorName}:not(:disabled):hover {
            background: ${dt(`button.text.${colorName}.hoverBackground`)};
        }
        .p-button-text.p-button-${colorName}:not(:disabled):active {
            background: ${dt(`button.text.${colorName}.activeBackground`)};
        }
`;

const generateCustomActiveIconColorCss = ({ colorName, dt }) => `
        .p-button--icon-active.p-button-${colorName} {
            background: ${dt(`button.${colorName}.background`)};
        }
        .p-button--icon-active.p-button-${colorName}:not(:disabled):hover {
            background: ${dt(`button.${colorName}.hoverBackground`)};
        }
        .p-button--icon-active.p-button-${colorName}:not(:disabled):active {
            background: ${dt(`button.${colorName}.activeBackground`)};
        }

        .p-button--icon-active.p-button-${colorName} svg {
            fill: ${dt(`button.${colorName}.color`)};
        }
        .p-button--icon-active.p-button-${colorName}:not(:disabled):hover svg {
            fill: ${dt(`button.${colorName}.hoverColor`)};
        }
        .p-button--icon-active.p-button-${colorName}:not(:disabled):active svg {
            fill: ${dt(`button.${colorName}.activeColor`)};
        }
`

const generateCustomOutlinedColorCss = ({ colorName, dt }) => `
        .p-button-outlined.p-button-${colorName} {
            outline: 1px solid ${dt(`button.outlined.${colorName}.borderColor`)};
        }
        .p-button-outlined.p-button-${colorName}:not(:disabled):hover {
            outline-color: ${dt(`button.outlined.${colorName}.borderColor`)};
            background: ${dt(`button.outlined.${colorName}.hoverBackground`)};
        }
        .p-button-outlined.p-button-${colorName}:not(:disabled):active {
            outline-color: ${dt(`button.outlined.${colorName}.borderColor`)};
            background: ${dt(`button.outlined.${colorName}.activeBackground`)};
        }

        .p-button-outlined.p-button-${colorName} svg {
            fill: ${dt(`button.outlined.${colorName}.color`)};
        }
`

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

        ${colors.map((color) => generateCustomActiveIconColorCss({ colorName: color, dt })).join('')}

        ${colors.map((color) => generateCustomOutlinedColorCss({ colorName: color, dt })).join('')}

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
            font-family: "Montserrat", monospace;
            text-transform: uppercase;
            border: none !important;
        }
        .p-button:hover {
            border: none !important;
        }
        .p-button.p-button--width-by-content {
            min-width: 0;
        }
        .p-button.p-button--wide {
            width: 100%;
        }
        .p-button.p-button--loading {
            pointer-events: none;
        }
        .p-button.p-button-outlined {
            background: transparent;
        }
        .p-button--icon-${ComponentSize.XS} {
            padding: ${dt(`button.iconXs.padding`)};
        }
        .p-button--icon-${ComponentSize.SM} {
            padding: ${dt(`button.iconSm.padding`)};
        }
        .p-button--icon-${ComponentSize.MD} {
            padding: ${dt(`button.iconMd.padding`)};
        }
        `,
};

export default button;
