import { SkillsAPI } from '@webitel/api-services/api';

/**
 * Skills moved to `@webitel/api-services`. This module stays as a
 * re-export so the existing `@webitel/ui-sdk/api/clients` import paths keep
 * working; import SkillsAPI from `@webitel/api-services/api` in new code.
 */
export default SkillsAPI;
