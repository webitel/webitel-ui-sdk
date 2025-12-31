export const MessageAction = {
  OpenImage: 'openImage',
  InitializedPlayer: 'initializedPlayer',
} as const;

export type MessageAction = (typeof MessageAction)[keyof typeof MessageAction];
