import type { EngineRoutingSchemaType } from './engineRoutingSchemaType';
/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { EngineSchemaTag } from './engineSchemaTag';

export interface EngineCreateRoutingSchemaRequest {
	tags?: EngineSchemaTag[];
	debug?: boolean;
	description?: string;
	editor?: boolean;
	name?: string;
	type?: EngineRoutingSchemaType;
}
