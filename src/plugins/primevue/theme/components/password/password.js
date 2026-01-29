import { PasswordScheme } from '@webitel/styleguide/component-schemes';

const password = {
	...PasswordScheme.sizes,
	colorScheme: PasswordScheme.colorScheme,

	css: ({ dt }) => `
    .wt-password .wt-icon {
      fill: ${dt('password.icon.color')};
    }
      
    .p-inputtext.p-invalid:enabled:hover {
      border-color: ${dt('inputtext.invalidHoverBorderColor')};
    }
  `,
};

export default password;
