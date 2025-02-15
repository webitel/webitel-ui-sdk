import upperCase from 'lodash/upperCase';

import { SupervisorSections } from './SupervisorSections';

/**
 * @deprecated
 * default export is for backward compatibility,
 * use ts enum instead (and don't forget to compile it)
 */
export default Object.fromEntries(
  Object.entries(SupervisorSections).map(([key, value]) => [
    upperCase(key).replaceAll(' ', '_'),
    value,
  ]),
);
