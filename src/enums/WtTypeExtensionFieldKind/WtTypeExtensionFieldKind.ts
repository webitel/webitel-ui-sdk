/**
 * @name FieldType
 * @description Enumerates (ONLY!) the types of field type.
 */

export const WtTypeExtensionFieldKind = {
  Text: 'string',
  Number: 'int32',
  Select: 'lookup',
  Multiselect: 'list',
  Calendar: 'datetime',
  Boolean: 'bool',
} as const;

export type ExtensionFieldType =
  (typeof WtTypeExtensionFieldKind)[keyof typeof WtTypeExtensionFieldKind];
