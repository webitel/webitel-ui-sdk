import { TooltipScheme } from '@webitel/styleguide/component-schemes';

const tooltip = {
  ...TooltipScheme.sizes,
  colorScheme: TooltipScheme.colorScheme,

  css: ({ dt }) => `
      .p-tooltip-text {
          white-space: pre-line;
          word-break: normal;
          background: ${dt(`tooltip.background`)};
          color: ${dt('tooltip.color')};
          padding: ${dt('tooltip.padding')};
          box-shadow: ${dt('tooltip.shadow')};
          border-radius: ${dt('tooltip.border.radius')};
      }
  `,
};

export default tooltip;
