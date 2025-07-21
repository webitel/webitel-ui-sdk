import {
  resolveKnowledgeBaseDocItems,
  resolveKnowledgeBaseLinkDoc,
} from '../routeResolvers';

export const knowledgeBaseIndexRoute = {
  text: 'index',
  link: resolveKnowledgeBaseLinkDoc('index.md'),
};

export const knowledgeBaseRoutes = [
  {
    text: 'Knowledge Base',
    collapsed: false,
    items: [
      knowledgeBaseIndexRoute,
      {
        text: 'FAQ',
        link: resolveKnowledgeBaseLinkDoc('faq/Readme.md'),
        collapsed: true,
      },
      {
        text: 'Sections',
        collapsed: true,
        items: [
          {
            text: 'General',
            collapsed: false,
            items: [
              {
                text: 'Code Base Deprecation Info',
                link: resolveKnowledgeBaseLinkDoc('general/code-base-deprecation-info/Readme.md'),
              },
              {
                text: 'Branching',
                link: resolveKnowledgeBaseLinkDoc('general/branching/Readme.md'),
              },
              {
                text: '📜 | Client-Server Communication',
                link: resolveKnowledgeBaseLinkDoc('general/client-server-communication/Readme.md'),
              },
            ],
          },
          {
            text: 'Projects structure',
            collapsed: true,
            items: [
              {
                text: 'App Structure',
                link: resolveKnowledgeBaseLinkDoc('projects-structure/app-structure/Readme.md'),
              },
              {
                text: 'Applications List',
                link: resolveKnowledgeBaseLinkDoc('projects-structure/applications-list/Readme.md'),
              },
              {
                text: 'Webitel packages',
                link: resolveKnowledgeBaseLinkDoc('projects-structure/webitel-packages/Readme.md'),
              },
            ],
          },
          {
            text: 'Code Style',
            collapsed: true,
            items: [
                {
                  text: 'index',
                    link: resolveKnowledgeBaseLinkDoc('code-style/index.md'),
                },
              {
                text: 'CSS',
                link: resolveKnowledgeBaseLinkDoc('code-style/css/index.md'),
              },
              {
                text: 'Inspiration Sources',
                link: resolveKnowledgeBaseLinkDoc('code-style/inspirations/index.md'),
              },
              {
                text: 'Linting and Formatting',
                link: resolveKnowledgeBaseLinkDoc('code-style/linting-and-reformatting/index.md'),
              },
            ],
          },
          {
            text: 'Namings',
            collapsed: true,
            items: resolveKnowledgeBaseDocItems('namings/**/*.md'),
          },
          {
            text: 'How To',
            collapsed: true,
            items: [
              {
                text: 'Estimate a task',
                link: resolveKnowledgeBaseLinkDoc('how-to/estimate-task/Readme.md'),
              },
              {
                text: 'Make a hotfix',
                link: resolveKnowledgeBaseLinkDoc('how-to/make-hotfix/Readme.md'),
              },
              {
                text: 'Add new docs page',
                link: resolveKnowledgeBaseLinkDoc('how-to/add-docs-page/Readme.md'),
              },
              {
                text: 'Setup Workspace app',
                link: resolveKnowledgeBaseLinkDoc('how-to/setup-workspace-app-entities/Readme.md'),
              },
              {
                text: '📜 | Add REST API module',
                link: resolveKnowledgeBaseLinkDoc('how-to/add-rest-api-module/Readme.md'),
              },
            ],
          },
          {
            text: 'Tests Cookbook',
            collapsed: true,
            items: resolveKnowledgeBaseDocItems('tests-cookbook/**/*.md'),
          },
        ],
      },
    ],
  },
];
