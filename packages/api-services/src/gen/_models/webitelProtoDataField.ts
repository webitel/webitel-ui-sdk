/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WebitelProtoDataTypeBinary } from './webitelProtoDataTypeBinary';
import type { WebitelProtoDataTypeBool } from './webitelProtoDataTypeBool';
import type { WebitelProtoDataTypeDatetime } from './webitelProtoDataTypeDatetime';
import type { WebitelProtoDataTypeDuration } from './webitelProtoDataTypeDuration';
import type { WebitelProtoDataTypeFloat } from './webitelProtoDataTypeFloat';
import type { WebitelProtoDataTypeInt } from './webitelProtoDataTypeInt';
import type { WebitelProtoDataTypeKind } from './webitelProtoDataTypeKind';
import type { WebitelProtoDataTypeLookup } from './webitelProtoDataTypeLookup';
import type { WebitelProtoDataTypeText } from './webitelProtoDataTypeText';
import type { WebitelProtoDataTypeUint } from './webitelProtoDataTypeUint';

/**
 * Field of the struct.
 */
export interface WebitelProtoDataField {
	/** Always signifies that the field value will be computed on any write (INSERT OR UPDATE) operations.
The field cannot be written to, and when read the result of the last generated expression will be returned.

The generation expression can refer to other columns in the table, but not other generated columns. Any functions and operators used must be immutable. References to other tables are not allowed. */
	always?: unknown;
	binary?: WebitelProtoDataTypeBinary;
	bool?: WebitelProtoDataTypeBool;
	datetime?: WebitelProtoDataTypeDatetime;
	/** The `default` expression will be used in `INSERT` operation
that does not specify a value for the field.

If there is no default for a field, then the default is null. */
	default?: unknown;
	disabled?: boolean;
	duration?: WebitelProtoDataTypeDuration;
	float?: WebitelProtoDataTypeFloat;
	float32?: WebitelProtoDataTypeFloat;
	float64?: WebitelProtoDataTypeFloat;
	hidden?: boolean;
	/** Short description. Default: {name}. */
	hint?: string;
	/** Field [code] name.

code */
	id?: string;
	int?: WebitelProtoDataTypeInt;
	int32?: WebitelProtoDataTypeInt;
	int64?: WebitelProtoDataTypeInt;
	/** Required. The field type. */
	kind?: WebitelProtoDataTypeKind;
	lookup?: WebitelProtoDataTypeLookup;
	/** Title of the field. Lang specific.

title */
	name?: string;
	/** Optional. Disable any write (INSERT OR UPDATE) operations.
READONLY signifies that the field value will be always computed on any write (INSERT OR UPDATE) operations.
If selected, the `default` value MUST be specified.

FIXME: Is base field ? [ id, created_, updated_ ] */
	readonly?: boolean;
	required?: boolean;
	richtext?: WebitelProtoDataTypeText;
	string?: WebitelProtoDataTypeText;
	uint?: WebitelProtoDataTypeUint;
	uint32?: WebitelProtoDataTypeUint;
	uint64?: WebitelProtoDataTypeUint;
}
