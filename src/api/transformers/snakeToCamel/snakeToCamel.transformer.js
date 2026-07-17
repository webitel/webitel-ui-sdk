import { objSnakeToCamel } from '../../../scripts/caseConverters.js';

/**
 * @param {string[]=} [skipKeys] keys to leave in snake_case
 */
const snakeToCamelTransformer = (skipKeys) => (obj) =>
	objSnakeToCamel(obj, skipKeys);
export default snakeToCamelTransformer;
