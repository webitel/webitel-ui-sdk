import { MultiSelectScheme } from '@webitel/styleguide/component-schemes';

const multiSelect = {
	...MultiSelectScheme.sizes,
	colorScheme: MultiSelectScheme.colorScheme,

	css: ({ dt }) => `
		/* @author @HlukhovYe
			https://github.com/primefaces/primevue/issues/7820#issuecomment-3436544795
			only possible way to make dropdown width as select's
		*/
		.p-multiselect-overlay {
			width: 0;
		}

		.p-multiselect-option span {
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	`,
};

export default multiSelect;
