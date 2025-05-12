import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const WebitelTheme = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        black: 'hsla(0,0%,0%,1)',
        white: 'hsla(0,0%,100%,1)',
        amber: {
          accent: {
            1: 'hsla(43,91%,75%,1)',
            2: 'hsla(43,90%,65%,1)',
            3: 'hsla(43,97%,50%,1)',
            4: 'hsla(43,97%,40%,1)',
          },
          lighten: {
            1: 'hsla(43,90%,60%,1)',
            2: 'hsla(43,90%,70%,1)',
            3: 'hsla(43,90%,80%,1)',
            4: 'hsla(43,88%,90%,1)',
            5: 'hsla(43,92%,95%,1)',
          },
          darken: {
            1: 'hsla(43,75%,35%,1)',
            2: 'hsla(43,75%,40%,1)',
            3: 'hsla(43,75%,45%,1)',
            4: 'hsla(43,75%,50%,1)',
          },
        },
        primary: {
          color: '{amber.accent.3}',
          hover: '{amber.accent.2}',
          light: '{amber.lighten.3}',
          on: '{black}',
        },
      },
      dark: {
        primary: {
          color: '{amber.accent.3}',
          hover: '{amber.accent.2}',
          light: '{amber.lighten.3}',
          on: '{black}',
        },
      },
    },
  },

  components: {
    button: {
      border: {
        radius: '4px',
      },

      // TODO investigate how to change the font weight
      label: {
        fontWeight: '600',
      },

      colorScheme: {
        light: {
          primary: {
            color: '{primary.on}',
            background: '{primary.light}',
            hoverColor: '{primary.on}',
            hoverBackground: '{primary.hover}',
          },
        },
      },
    },
  },
});

export default WebitelTheme;
