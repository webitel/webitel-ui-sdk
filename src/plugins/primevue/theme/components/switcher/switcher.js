import { SwitcherScheme } from '@webitel/styleguide/component-schemes';

const switcher = {
  ...SwitcherScheme.sizes,
  colorScheme: SwitcherScheme.colorScheme,

  css: ({ dt }) => `
    .p-toggleswitch {
      min-width: ${dt('toggleswitch.width')};
    }
  `
};

export default switcher;