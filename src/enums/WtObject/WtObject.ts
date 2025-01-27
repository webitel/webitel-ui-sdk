/**
 * Represents existing Webitel entities
 */
export const WtObject = {
  Agent: 'agent',
  Queue: 'queue',
  Contact: 'contact',
  Region: 'region',
  User: 'user',
} as const;

export type WtObject = (typeof WtObject)[keyof typeof WtObject];
