/**
 * Represents existing Webitel entities
 */
export const WtObject = {
  Agent: 'agent',
  Queue: 'queue',
  Contact: 'contact',
  Regions: 'regions',
} as const;

export type WtObject = (typeof WtObject)[keyof typeof WtObject];
