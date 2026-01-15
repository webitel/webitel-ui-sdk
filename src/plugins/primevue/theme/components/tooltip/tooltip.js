import { TooltipScheme } from '@webitel/styleguide/component-schemes';
import { WtTypography } from '@webitel/styleguide/enums';

import { generateWtTypographyCustomCss } from '../../_shared/generators/generateWtTypographyCustomCss';

const tooltip = {
	root: TooltipScheme.sizes,
	colorScheme: TooltipScheme.colorScheme,

	css: ({ dt }) => `
      .p-tooltip-text {
        ${generateWtTypographyCustomCss({
          dt,
          typo: WtTypography.Body2,
        })}
          white-space: pre-line;
          word-break: normal;
          background: ${dt('tooltip.background')};
          color: ${dt('tooltip.color')};
          padding: ${dt('tooltip.padding')};
          box-shadow: ${dt('tooltip.shadow')};
          border-radius: ${dt('tooltip.border.radius')};
      }
  `,
};

export default tooltip;
