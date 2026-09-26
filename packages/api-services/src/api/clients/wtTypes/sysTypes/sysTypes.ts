import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '../../../defaults';
import {
	addQueryParamsToUrl,
	applyTransform,
	camelToSnake,
	generateUrl,
	merge,
	notify,
	sanitize,
	starToSearch,
} from '../../../transformers';
import type { ApiParams } from '../../_shared/types';

const instance = getDefaultInstance();

type SysTypeRecord = Record<string, unknown>;

// `{path.to.field}` placeholders in a display template
const displayPlaceholder = /\{([^}]+)\}/g;

const readPath = (record: SysTypeRecord, path: string): unknown =>
	path
		.split('.')
		.reduce<unknown>(
			(value, key) => (value as SysTypeRecord | undefined)?.[key],
			record,
		);

/**
 * A display is either a plain (dot-)path to one field, or a template such as
 * `{name} ({code})`; an unresolved placeholder is left as written.
 */
const displayName = (display: string, record: SysTypeRecord): unknown => {
	if (!display.match(displayPlaceholder)) return readPath(record, display);
	return display.replace(displayPlaceholder, (_, key: string) => {
		const value = readPath(record, key);
		return value === undefined || value === null ? `{${key}}` : String(value);
	});
};

/** Maps records to select options: `id` from `primary`, `name` from `display`. */
const toSelectOptions =
	({ display, primary }: { display?: string; primary?: string }) =>
	(records: SysTypeRecord[]) =>
		records.map((record) => ({
			...record,
			...(primary && {
				id: record[primary],
			}),
			...(display && {
				name: displayName(display, record),
			}),
		}));

/**
 * Records of a system type at `path`, for lookups. `filters` are pre-built
 * `key=value` query conditions (as form schemas store them) appended as-is.
 */
const getSysTypeRecordsList = async ({
	path,
	display,
	primary,
	filters = [],
	...params
}: {
	path: string;
	display: string;
	primary: string;
	filters?: string[];
} & ApiParams) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
		'ids',
	];

	const url = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		(params) => ({
			...params,
			ids: params.id /* https://webitel.atlassian.net/browse/WTEL-6788 */,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
		generateUrl(path),
		addQueryParamsToUrl(filters),
	]);
	try {
		const response = await instance.get(url);
		const { data, items, next } = applyTransform(response.data, [
			merge(getDefaultGetListResponse()),
		]);

		return {
			// Some endpoints return data, some return items so we need to check for both of them
			items:
				applyTransform(data || items || [], [
					toSelectOptions({
						display,
						primary,
					}),
				]) ?? [],
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getSysTypeRecordsLookup = (
	params: Parameters<typeof getSysTypeRecordsList>[0],
) =>
	getSysTypeRecordsList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

export const SysTypesAPI = {
	getList: getSysTypeRecordsList,
	getLookup: getSysTypeRecordsLookup,
};
