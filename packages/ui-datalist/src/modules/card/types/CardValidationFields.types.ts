import type { RegleSchemaFieldStatus } from '@regle/schemas';

export type CardValidationFields<T> = {
	[K in keyof T]: RegleSchemaFieldStatus<T[K]>;
};
