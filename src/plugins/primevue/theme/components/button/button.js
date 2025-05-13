const button = {
  border: {
    radius: '4px',
  },

  colorScheme: {
    light: {
      primary: {
        color: '{black}',
        background: '{primary-color}',
        hoverColor: '{black}',
        activeColor: '{black}',
        activeBackground: '{primary-hover-color}',
        hoverBackground: '{primary-hover-color}',
      },
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
        .p-button-transfer {
            background: ${dt('button.transfer.color')};
            color: ${dt('button.transfer.inverse.color')};
            transition-duration: ${dt('my.transition.fast')};
        }
        .p-button {
            padding: 8px 16px;
            font-weight: 600;
            font-size: 12px;
            line-height: 24px;
            border: none;
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
