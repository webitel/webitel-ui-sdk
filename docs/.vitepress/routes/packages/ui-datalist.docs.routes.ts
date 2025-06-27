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
  ],
}];
