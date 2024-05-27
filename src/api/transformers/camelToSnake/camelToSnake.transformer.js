import { objCamelToSnake } from '../../../scripts/caseConverters.js';

const camelToSnakeTransformer = (skipKeys) => (obj) => objCamelToSnake(obj, skipKeys);
export default camelToSnakeTransformer;
