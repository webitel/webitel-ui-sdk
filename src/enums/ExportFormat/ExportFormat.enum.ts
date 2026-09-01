export const ExportFormat = {
	CSV: 'csv',
	XLSX: 'xlsx',
} as const;

export type ExportFormat = (typeof ExportFormat)[keyof typeof ExportFormat];
