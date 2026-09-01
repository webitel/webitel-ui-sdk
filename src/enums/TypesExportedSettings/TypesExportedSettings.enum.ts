import { ExportFormat } from '../ExportFormat/ExportFormat.enum';

export const TypesExportedSettings = {
	CSV: ExportFormat.CSV,
	XLSX: ExportFormat.XLSX,
} as const;

export type TypesExportedSettings =
	(typeof TypesExportedSettings)[keyof typeof TypesExportedSettings];
