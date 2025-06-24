import { objCamelToSnake } from '../../../utils/api/caseConverters';

const camelToSnakeTransformer = (skipKeys) => (obj) =>
	objCamelToSnake(obj, skipKeys);
export default camelToSnakeTransformer;
