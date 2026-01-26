import { PopoverScheme } from '@webitel/styleguide/component-schemes';
import { WtTypography } from '@webitel/styleguide/enums';

import { generateWtTypographyCustomCss } from '../../_shared/generators/generateWtTypographyCustomCss';

const popover = {
	root: PopoverScheme.sizes,
	colorScheme: PopoverScheme.colorScheme,
	css: ({ dt }) => `
		.p-popover-content {
			${generateWtTypographyCustomCss({
				dt,
				typo: WtTypography.Body1,
			})}
		}
	`,
};

export default popover;
