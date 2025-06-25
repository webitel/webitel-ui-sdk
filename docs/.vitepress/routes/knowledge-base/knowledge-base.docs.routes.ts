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
        items: resolveKnowledgeBaseDocItems('faq/**/*.md'),
        collapsed: true,
      },
      {
        text: 'Sections',
        collapsed: true,
        items: [
          {
            text: 'Architecture, Structures, Design, etc',
            collapsed: true,
            items: resolveKnowledgeBaseDocItems(
              'architecture-and-structures/**/*.md',
            ),
          },
          {
            text: 'How To',
            collapsed: true,
            items: resolveKnowledgeBaseDocItems('how-to/**/*.md'),
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
