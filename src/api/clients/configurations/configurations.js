import { ConfigurationsAPI } from '@webitel/api-services/api';

/**
 * Configurations moved to `@webitel/api-services`. This module stays as a
 * re-export so the existing `@webitel/ui-sdk/api/clients` import paths keep
 * working; import ConfigurationsAPI from `@webitel/api-services/api` in new code.
 */
export default ConfigurationsAPI;
