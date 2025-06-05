const lightTheme = {
  primary: {
    color: '{primary-on-color}',
    activeColor: '{primary-on-color}',
    hoverColor: '{primary-on-color}',

    background: '{primary-color}',
    activeBackground: '{primary-hover-color}',
    hoverBackground: '{primary-hover-color}',
  },

  secondary: {
    color: '{grey.darken.4}',
    activeColor: '{grey.darken.4}',
    hoverColor: '{grey.darken.4}',

    background: '{dp-surface-color.10}',
    activeBackground: '{dp-surface-color.14}',
    hoverBackground: '{dp-surface-color.14}',
  },

  success: {
    color: '{grey.lighten.5}',
    activeColor: '{grey.lighten.5}',
    hoverColor: '{grey.lighten.5}',

    background: '{success-color}',
    activeBackground: '{success-hover-color}',
    hoverBackground: '{success-hover-color}',
  },

  info: {
    color: '{grey.lighten.5}',
    activeColor: '{grey.lighten.5}',
    hoverColor: '{grey.lighten.5}',

    background: '{info-color}',
    activeBackground: '{info-hover-color}',
    hoverBackground: '{info-hover-color}',
  },

  job: {
    color: '{grey.lighten.5}',
    activeColor: '{grey.lighten.5}',
    hoverColor: '{grey.lighten.5}',

    background: '{job-color}',
    activeBackground: '{job-hover-color}',
    hoverBackground: '{job-hover-color}',
  },

  error: {
    color: '{grey.lighten.5}',
    activeColor: '{grey.lighten.5}',
    hoverColor: '{grey.lighten.5}',

    background: '{error-color}',
    activeBackground: '{error-hover-color}',
    hoverBackground: '{error-hover-color}',
  },

  transfer: {
    color: '{transfer-on-color}',
    activeColor: '{transfer-on-color}',
    hoverColor: '{transfer-on-color}',

    background: '{transfer-color}',
    activeBackground: '{transfer-hover-color}',
    hoverBackground: '{transfer-hover-color}',
  },

  disabled: {
    color: '{grey.darken.1}',
    background: '{dp-surface-color.16}',
  },
};

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
  border: {
    radius: '4px',
  },

  padding: {
    x: '{spacings.sm}',
    y: '{spacings.xs}',
  },

  sm: {
    padding: {
      x: '{spacings.xs}',
      y: '{spacings.2xs}',
    },
  },

  colorScheme: {
    light: {
      ...lightTheme,
    },
  },

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
            font-family: "Montserrat", monospace;
            border: none;
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
