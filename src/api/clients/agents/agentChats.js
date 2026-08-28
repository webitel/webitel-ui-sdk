import { AgentChatsAPI } from '@webitel/api-services/api';

/**
 * Agent chats moved to `@webitel/api-services`. This module stays as a
 * re-export so the existing `@webitel/ui-sdk/api/clients` import paths keep
 * working; import AgentChatsAPI from `@webitel/api-services/api` in new code.
 */
export default AgentChatsAPI;
