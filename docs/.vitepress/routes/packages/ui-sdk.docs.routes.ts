import { resolvePkgDocItems, resolvePkgLinkDoc } from '../routeResolvers';

const resolveLink = resolvePkgLinkDoc('ui-sdk');
const resolveItems = resolvePkgDocItems('ui-sdk');

export const uiSdkIndexRoute = {
  text: 'index',
  link: resolveLink('index.md'),
};
export const uiSdkRoutes = [
  {
    text: '@webitel/ui-sdk',
    collapsed: false,
    items: [
      uiSdkIndexRoute,
      {
        text: 'Changelog',
        items: resolveItems('changelog.md'),
        // collapsed: false,
      },

      {
        text: 'API Tools',
        items: resolveItems('api/**/*.md'),
        collapsed: true,
      },
      {
        text: 'Locale',
        items: resolveItems('locale/**/*.md'),
        collapsed: true,
      },
      {
        text: 'Assets',
        items: resolveItems('assets/**/*.md'),
        collapsed: false,
      },
      {
        text: 'CSS',
        items: resolveItems('css/**/*.md'),
        collapsed: true,
      },
      {
        text: 'Components',
        items: resolveItems('components/**/*.md'),
        collapsed: true,
      },
      {
        text: 'Components/on-demand',
        items: resolveItems('components/on-demand/**/*.md'),
        collapsed: true,
      },
      {
        text: 'Composables',
        items: resolveItems('composables/**/*.md'),
        collapsed: true,
      },
      {
        text: 'Enums',
        items: [
          ...resolveItems('enums/index.md'),
          {
            text: 'Non-cathegorized',
            collapsed: false,
            items: resolveItems([
              'enums/**/*.md',
              '!enums/index.md',
              '!enums/WebitelApplications/*.md',
            ]),
          },
          {
            text: 'WebitelApplications',
            collapsed: false,
            items: resolveItems('enums/WebitelApplications/*.md'),
          },
        ],
        collapsed: true,
      },
      {
        text: 'Modules',
        items: [
          ...resolveItems([
            'modules/**/*.md',
            '!modules/Userinfo',
            '!modules/ObjectPermissions',
            '!modules/TableComponentModule',
          ]),
          {
            text: 'Module: Object Permissions',
            collapsed: true,
            items: [
              ...resolveItems(['modules/ObjectPermissions/index.md']),
              {
                text: 'Components',
                items: resolveItems([
                  'modules/ObjectPermissions/components/**/*.md',
                ]),
              },
              {
                text: 'Store',
                items: resolveItems([
                  'modules/ObjectPermissions/store/**/*.md',
                ]),
              },
            ],
          },
          {
            text: 'Module: Table Component Module',
            collapsed: true,
            items: [
              ...resolveItems('modules/TableComponentModule/index.md'),
              {
                text: 'Composables',
                items: resolveItems(
                  'modules/TableComponentModule/composables/**/*.md',
                ),
              },
            ],
          },
          {
            text: 'Userinfo',
            collapsed: true,
            items: [
              {
                text: 'main',
                link: resolveLink('modules/Userinfo/Readme.md'),
              },
              {
                text: 'Access Control, Access Computing',
                link: resolveLink('modules/Userinfo/access/Readme.md'),
              },
              {
                text: 'v1',
                collapsed: true,
                items: [
                  {
                    text: 'main',
                    link: resolveLink('modules/Userinfo/v1/Readme.md'),
                  },
                ],
              },
              {
                text: 'v2',
                collapsed: true,
                items: [
                  {
                    text: 'main',
                    link: resolveLink('modules/Userinfo/v2/Readme.md'),
                  },
                  {
                    text: 'Access',
                    items: [
                      {
                        text: 'Store',
                        link: resolveLink(
                          'modules/Userinfo/v2/access/stores/Readme.md',
                        ),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        collapsed: true,
      },
      {
        text: 'Scripts',
        items: [
          ...resolveItems('scripts/index.md'),
          ...resolveItems(['scripts/**/*.md', '!scripts/index.md']),
        ],
        collapsed: true,
      },
      {
        text: 'Store',
        items: resolveItems('store/**/*.md'),
        collapsed: true,
      },
      {
        text: 'Test utils and Mocks',
        items: resolveItems('tests/**/*.md'),
        collapsed: true,
      },
      {
        text: 'Validators',
        items: resolveItems('validators/**/*.md'),
        collapsed: true,
      },
    ],
  },
];
