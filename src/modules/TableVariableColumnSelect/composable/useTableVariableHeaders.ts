import type { WtTableHeader } from '../../../components/wt-table/types/WtTable';

export const VARIABLE_FIELD_PREFIX = 'variables.';

export type TableVariableHeader = WtTableHeader;

type HeadersRef = {
	readonly value: TableVariableHeader[];
};

export const isVariableHeader = (
	header: Pick<TableVariableHeader, 'field' | 'value'>,
) =>
	(header.field ?? '').startsWith(VARIABLE_FIELD_PREFIX) ||
	(header.value ?? '').startsWith(VARIABLE_FIELD_PREFIX);

export function useTableVariableHeaders({
	headers,
	updateShownHeaders,
}: {
	headers: HeadersRef;
	updateShownHeaders: (headers: TableVariableHeader[]) => void;
}) {
	const updateVariableHeaders = (incoming: TableVariableHeader[]) => {
		const incomingByField = new Map(
			incoming.map((header) => [
				header.field,
				header,
			]),
		);

		const updatedHeaders = headers.value.flatMap((header) => {
			if (!isVariableHeader(header))
				return [
					header,
				];

			const next = incomingByField.get(header.field);
			if (!next) return [];

			incomingByField.delete(header.field);
			return [
				{
					...next,
					show: header.show,
				},
			];
		});

		updateShownHeaders([
			...updatedHeaders,
			...incomingByField.values(),
		]);
	};

	return {
		updateVariableHeaders,
	};
}
