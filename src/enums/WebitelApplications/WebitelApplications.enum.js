import upperCase from 'lodash/upperCase.js';

import { WtApplication } from './WtApplication';

/**
 * @deprecated
 * default export is for backward compatibility,
 * use ts enum instead (and don't forget to compile it)
 */
export default Object.fromEntries(
  Object.entries(WtApplication).map(([key, value]) => [
    upperCase(key).replaceAll(' ', '_'),
    value,
  ]),
);
