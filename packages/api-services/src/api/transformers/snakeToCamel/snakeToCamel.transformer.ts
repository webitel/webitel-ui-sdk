import { objSnakeToCamel } from '../../../utils/api/caseConverters';

const snakeToCamelTransformer =
	(skipKeys: string[] = []) =>
	(obj) =>
		objSnakeToCamel(obj, skipKeys);
export default snakeToCamelTransformer;
