import { objSnakeToCamel } from '../../../utils/api/caseConverters';

const snakeToCamelTransformer =
	(skipKeys: string[] = []) =>
	(obj: unknown) =>
		objSnakeToCamel(obj, skipKeys);
export default snakeToCamelTransformer;
