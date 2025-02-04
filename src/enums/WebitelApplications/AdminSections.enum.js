import { makeCompatEnum } from '../utils.js';
import { AdminSections } from './AdminSections';

/**
 * @deprecated
 * default export is for backward compatibility,
 * use ts enum instead (and don't forget to compile it)
 */
const compatAdminSections = makeCompatEnum(AdminSections);
export default compatAdminSections;
