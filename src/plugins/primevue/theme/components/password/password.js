import { PasswordScheme } from '@webitel/styleguide/component-schemes';

const password = {
	...PasswordScheme.sizes,
	colorScheme: PasswordScheme.colorScheme,

	css: ({ dt }) => `
    .wt-password .wt-icon {
      fill: ${dt('password.icon.color')};
    }
  `,
};

export default password;
