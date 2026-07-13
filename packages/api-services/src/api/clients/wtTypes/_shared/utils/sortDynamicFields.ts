import deepCopy from 'deep-copy';
import type {
	WebitelProtoDataField,
	WebitelProtoDataStruct,
} from 'webitel-sdk';

// The generated webitel-sdk type omits `position`, but the backend returns it
// and it drives ordering of dynamic fields.
type SortableDataField = WebitelProtoDataField & {
	position?: number;
};

export const sortDynamicFields = (
	item: WebitelProtoDataStruct,
): WebitelProtoDataStruct => {
	const allFields = (item.fields ?? []) as SortableDataField[];

	const unSortableFields = allFields.filter((field) => !field.position);

	const sortableFields = (deepCopy(allFields) as SortableDataField[])
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
