import { RadioScheme } from '@webitel/styleguide/component-schemes';

const radio = {
	root: RadioScheme.sizes,
	colorScheme: RadioScheme.colorScheme,

	css: ({ dt }) => `
    .p-radiobutton {
      width: ${dt('radiobutton.root.wrapperWidth')};
      height: ${dt('radiobutton.root.wrapperHeight')};
      align-items: center;
      justify-content: center;
    }
  `,
};

export default radio;
