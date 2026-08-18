import { objCamelToSnake } from '../../../utils/api/caseConverters';

const camelToSnakeTransformer =
	(skipKeys: string[] = []) =>
	(obj: unknown) =>
		objCamelToSnake(obj, skipKeys);
export default camelToSnakeTransformer;
