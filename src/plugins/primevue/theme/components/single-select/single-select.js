import { SingleSelectScheme } from '@webitel/styleguide/component-schemes';

const singleSelect = {
	...SingleSelectScheme.sizes,
	colorScheme: SingleSelectScheme.colorScheme,

	css: ({ dt }) => `
		/* @author @HlukhovYe
			https://github.com/primefaces/primevue/issues/7820#issuecomment-3436544795
			only possible way to make dropdown width as select's
		*/
		.p-select-overlay {
			width: 0;
		}

		.p-select-option-label {
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	`,
};

export default singleSelect;
