import type {
	DataField,
	ProtoDataStruct,
} from '@webitel/api-services/gen/models';
import deepCopy from 'deep-copy';

// The generated type omits `position`, but the backend returns it
// and it drives ordering of dynamic fields.
type SortableDataField = DataField & {
	position?: number;
};

export const sortDynamicFields = (item: ProtoDataStruct): ProtoDataStruct => {
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
