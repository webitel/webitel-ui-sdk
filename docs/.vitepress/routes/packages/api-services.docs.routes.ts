import { resolvePkgLinkDoc } from '../routeResolvers';

const resolveLink = resolvePkgLinkDoc('api-services');

export const apiServicesIndexRoute =  {
  text: 'index',
  link: resolveLink('index.md'),
};

export const apiServicesRoutes = [{
  text: '@webitel/api-services',
  collapsed: false,
  items: [
    apiServicesIndexRoute,
    {
      text: 'Package Contents',
      link: resolveLink('contents/index.md'),
    },
    {
      text: 'Usage',
      items: [
        {
          text: 'index',
          link: resolveLink('usage/index.md'),
        },
        {
          text: 'TLDR; Usage Example',
          link: resolveLink('usage/tldr-usage/index.md'),
        },
        {
          text: 'Migration from webitel-sdk',
          link: resolveLink('usage/general/index.md'),
        },
        {
          text: 'Migration from @webitel/ui-sdk/api',
          link: resolveLink('usage/migration/index.md'),
        },
      ],
    },
  ],
}];
