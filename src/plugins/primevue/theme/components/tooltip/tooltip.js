import { TooltipScheme } from '@webitel/styleguide/component-schemes';

const tooltip = {
  ...TooltipScheme.sizes,
  colorScheme: TooltipScheme.colorScheme,

  css: () => `
      .p-tooltip-text {
          white-space: pre-line;
          word-break: normal;
          background: var(--p-tooltip-background);
          color: var(--p-tooltip-color);
          padding: var(--p-tooltip-padding);
          box-shadow: var(--p-tooltip-shadow);
          border-radius: var(--p-tooltip-border-radius);
      }
  `,
};

export default tooltip;
