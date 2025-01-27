export const WtTreeMode = {
  Tree: 'tree',
  List: 'list',
} as const;

export type WtTreeMode = (typeof WtTreeMode)[keyof typeof WtTreeMode];
