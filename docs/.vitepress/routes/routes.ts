import isObject from 'lodash/isObject';
import { apiServicesRoutes, apiServicesIndexRoute, } from "./packages/api-services.docs.routes";
import {knowledgeBaseRoutes, knowledgeBaseIndexRoute } from "./knowledge-base/knowledge-base.docs.routes";
import { uiSdkRoutes, uiSdkIndexRoute } from "./packages/ui-sdk.docs.routes";

const navbarNav = [
  { text: 'Home', link: '/' },
  { text: 'Knowledge Base', link: knowledgeBaseIndexRoute.link },
  { text: '@webitel/api-services', link: apiServicesIndexRoute.link },
  { text: '@webitel/ui-sdk', link: uiSdkIndexRoute.link },
];

const sidebarNav = [
  ...knowledgeBaseRoutes,
  ...apiServicesRoutes,
  ...uiSdkRoutes,
];

const linkify = (nav) => {
  if (Array.isArray(nav)) {
    return nav.map((item) => linkify(item));
  }

  if (isObject(nav)) {
    if (nav.link) return nav;

    return {
      ...nav,
      items: nav.items.map((item) => linkify(item)),
    };
  }

  if (typeof nav === 'string') {
    const getParentDirName = (nav) => nav.split('/').at(-2);
    const getFilename = (nav) => nav.split('/').pop().replace(/\.md$/, '');
    const getLink = (nav) => '/pages/'.concat(nav.replace('.md', '.html'));

    const text = nav.endsWith('Readme.md')
      ? getParentDirName(nav)
      : getFilename(nav);
    const link = getLink(nav);

    return { text, link };
  }

  console.error('tf is that sidebar nav item type', nav);

  return nav;
};

const generateSidebar = (sidebarNav) => {
  const sb = linkify(sidebarNav);
  // console.info(JSON.stringify(sb, null, 2));
  return sb;
};

const generateNav = (navbarNav) => {
  const nav = linkify(navbarNav);
  // console.info(JSON.stringify(sb, null, 2));
  return nav;
};

const sidebar = generateSidebar(sidebarNav);
const nav = generateNav(navbarNav);

export { nav, sidebar };
