import deepCopy from 'deep-copy';
import type {
	WebitelProtoDataField,
	WebitelProtoDataStruct,
} from 'webitel-sdk';

/**
 * TODO(types): `position` is returned by the API to order dynamic fields but is
 * absent from the generated `WebitelProtoDataField` type. Extend locally until
 * the generated SDK type includes it.
 */
type PositionedDataField = WebitelProtoDataField & {
	position?: number;
};

export const sortDynamicFields = (
	item: WebitelProtoDataStruct,
): WebitelProtoDataStruct => {
	const sourceFields = (item.fields ?? []) as PositionedDataField[];

	const unSortableFields = sourceFields.filter((field) => !field.position);

	const sortableFields = deepCopy(sourceFields)
		.filter((field) => field.position)
		.sort((a, b) => {
			return (a.position ?? 0) - (b.position ?? 0);
		});

	const fields = [
		...unSortableFields,
		...sortableFields,
	];

	return {
		...item,
		fields,
	};
};
