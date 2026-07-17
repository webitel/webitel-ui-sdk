/**
 * @name FieldType
 * @description Enumerates (ONLY!) the types of field type.
 */
export declare const WtTypeExtensionFieldKind: {
	readonly Text: 'string';
	readonly Number: 'int32';
	readonly Select: 'lookup';
	readonly Multiselect: 'list';
	readonly Calendar: 'datetime';
	readonly Boolean: 'bool';
};
export type ExtensionFieldType =
	(typeof WtTypeExtensionFieldKind)[keyof typeof WtTypeExtensionFieldKind];
