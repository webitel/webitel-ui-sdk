/**
 * @description
 * backend `scope` field userinfo response classes
 * `class` represents a group of entities, managed by this one class
 */
export const ScopeClass = {
  /**
   * Includes:
   * - {@link WtObject.Agent}
   * - {@link }
   */
  Agent: 'cc_agent',
  Queue: 'cc_queue',
  Dictionaries: 'dictionaries',
  EmailProfile: 'email_profile',
} as const;

export type ScopeClass = (typeof ScopeClass)[keyof typeof ScopeClass];
