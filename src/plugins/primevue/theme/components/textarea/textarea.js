import { TextareaScheme } from '@webitel/styleguide/component-schemes';
import { WtTypography } from '@webitel/styleguide/enums';

import { generateWtTypographyCustomCss } from '../../_shared/generators/generateWtTypographyCustomCss';

const textarea = {
	root: TextareaScheme.sizes,
	colorScheme: TextareaScheme.colorScheme,

	css: ({ dt }) => `
      .wt-textarea__textarea {
        ${generateWtTypographyCustomCss({
					dt,
					typo: WtTypography.Body1,
				})}
        min-height: ${dt('textarea.minHeight')};
      }
  `,
};

export default textarea;
