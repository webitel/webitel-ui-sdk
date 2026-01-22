import { SwitcherScheme } from '@webitel/styleguide/component-schemes';

const switcher = {
	root: SwitcherScheme.sizes,
	colorScheme: SwitcherScheme.colorScheme,

	css: ({ dt }) => `
    .p-toggleswitch {
      flex-shrink: 0;
    }
  `,
};

export default switcher;
