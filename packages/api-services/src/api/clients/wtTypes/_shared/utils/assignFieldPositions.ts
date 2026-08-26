import type {
	DataField,
	ProtoDataStruct,
} from '@webitel/api-services/gen/models';

type PositionableDataField = DataField & {
	position?: number;
};

// readonly (system) fields never get a position; every other field is
// numbered in the order the backend returns it, 1-based.
export const assignFieldPositions = (
	item: ProtoDataStruct,
): ProtoDataStruct => {
	let position = 1;

	const fields = ((item.fields ?? []) as PositionableDataField[]).map(
		(field) => ({
			...field,
			position: field.readonly ? undefined : position++,
		}),
	);

	return {
		...item,
		fields,
	};
};
