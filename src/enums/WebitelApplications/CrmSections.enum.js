import { CrmSections } from './CrmSections';

/**
 * @deprecated
 * default export is for backward compatibility,
 * use ts enum instead (and don't forget to compile it)
 */
export default Object.fromEntries(
  Object.entries(CrmSections).map(([key, value]) => [key.toUpperCase(), value]),
);
