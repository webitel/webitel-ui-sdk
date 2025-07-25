import { resolvePkgLinkDoc } from '../routeResolvers';

const resolveLink = resolvePkgLinkDoc('ui-datalist');

export const uiDatalistIndexRoute =  {
  text: 'index',
  link: resolveLink('index.md'),
};

export const uiDatalistRoutes = [{
  text: '@webitel/ui-datalist',
  collapsed: false,
  items: [
    uiDatalistIndexRoute,
    {
      text: 'Package Contents',
      link: resolveLink('contents/index.md'),
    },
    {
      text: 'Shared Modules',
      collapsed: true,
      items: [
        {
          text: 'index',
          link: resolveLink('shared/index.md'),
        },
        {
          text: 'Stores persistence',
          link: resolveLink('shared/persist/index.md'),
        },
        {
          text: 'Store types',
          link: resolveLink('shared/store-types/index.md'),
        },
      ],
    },
    {
      text: 'Table Tools',
      collapsed: true,
      items: [
        {
          text: 'index',
          link: resolveLink('table-tools/index.md'),
        },
        {
          text: 'Table Module',
          link: resolveLink('table-tools/table/index.md'),
        },
        {
          text: 'Page, Headers, Filters',
          link: resolveLink('table-tools/table-deps/index.md'),
        },
      ],
    },
    {
      text: 'Card Tools',
      collapsed: true,
      items: [
        {
          text: 'index',
          link: resolveLink('card-tools/index.md'),
        },
        {
          text: 'Card Module',
          collapsed: true,
          items: [
            {
              text: 'main',
              link: resolveLink('card-tools/card/Readme.md'),
            },
            {
              text: 'Card Store',
              link: resolveLink('card-tools/card/stores/Readme.md'),
            },
            {
              text: 'Card Composables',
              link: resolveLink('card-tools/card/composables/Readme.md'),
            },
          ],
        },
        {
          text: 'Validation',
          collapsed: true,
          items: [
            {
              text: 'main',
              link: resolveLink('card-tools/validations/Readme.md'),
            },
            {
              text: 'Regle',
              link: resolveLink('card-tools/validations/regle/Readme.md'),
            },
            {
              text: 'Zod',
              link: resolveLink('card-tools/validations/zod/Readme.md'),
            },
            {
              text: 'Usage',
                link: resolveLink('card-tools/validations/usage/Readme.md'),
            },
          ],
        },
      ],
    },
  ],
}];
