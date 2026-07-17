import { objCamelToSnake } from '../../../scripts/caseConverters.js';

/**
 * @param {string[]=} [skipKeys] keys to leave in camelCase
 */
const camelToSnakeTransformer = (skipKeys) => (obj) =>
	objCamelToSnake(obj, skipKeys);
export default camelToSnakeTransformer;
