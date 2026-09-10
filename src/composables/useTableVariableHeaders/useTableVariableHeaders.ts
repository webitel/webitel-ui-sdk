const PREFIX = 'variables.';

export type TableVariableHeader = {
	field?: string;
	value?: string;
	show?: boolean;
	text?: string;
};

type VariableEntry = {
	key?: string;
	value?: unknown;
};

type HeadersRef = {
	readonly value: TableVariableHeader[];
};

export const isVariableHeader = (
	header: Pick<TableVariableHeader, 'field' | 'value'>,
) =>
	(header.field ?? '').startsWith(PREFIX) ||
	(header.value ?? '').startsWith(PREFIX);

export const getVariableValue = (
	item:
		| {
				variables?: unknown;
		  }
		| null
		| undefined,
	field: string,
) => {
	const key = field.replace(PREFIX, '');
	const variables = item?.variables as
		| {
				data?: VariableEntry[];
		  }
		| VariableEntry[]
		| Record<string, unknown>
		| undefined;
	const list =
		(
			variables as
				| {
						data?: VariableEntry[];
				  }
				| undefined
		)?.data ?? variables;

	if (Array.isArray(list)) {
		return list.find((variable: VariableEntry) => variable.key === key)?.value;
	}

	return (variables as Record<string, unknown> | undefined)?.[key];
};

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
