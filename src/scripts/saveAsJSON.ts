import { saveAs } from 'file-saver-es';

/**
 * [Claude] Downloads `content` as a pretty-printed JSON file.
 * Spaces and commas in `name` become dashes; `.json` is added unless it's there.
 */
const saveAsJSON = (name: string, content: unknown): void => {
	const baseName = name.replace(/[ ,]+/g, '-');
	const fileName = baseName.endsWith('.json') ? baseName : `${baseName}.json`;
	const file = new Blob(
		[
			JSON.stringify(content, null, 4),
		],
		{
			type: 'application/json',
		},
	);
	saveAs(file, fileName);
};

export default saveAsJSON;
