import { BreadcrumbScheme } from '@webitel/styleguide/component-schemes';

const breadcrumb = {
  ...BreadcrumbScheme.sizes,
  colorScheme: BreadcrumbScheme.colorScheme,


  css: ({ dt }) => `
    .p-breadcrumb .p-breadcrumb-list .p-breadcrumb-item .wt-breadcrumb__text {
        color: ${dt(`breadcrumb.item.color`)};
    }

    .p-breadcrumb .p-breadcrumb-list .p-breadcrumb-separator .wt-icon {
        width: ${dt(`breadcrumb.separator.size`)};
        height: ${dt(`breadcrumb.separator.size`)};
    }

    .p-breadcrumb .p-breadcrumb-list .p-breadcrumb-separator .wt-icon svg {
        fill: ${dt(`breadcrumb.separator.color`)};
    }

    .p-breadcrumb .p-breadcrumb-list .p-breadcrumb-separator:has(+ .p-breadcrumb-item:last-child) .wt-icon svg {
        fill: ${dt(`breadcrumb.separator.lastItemColor`)};
    }
  `,
};

export default breadcrumb;