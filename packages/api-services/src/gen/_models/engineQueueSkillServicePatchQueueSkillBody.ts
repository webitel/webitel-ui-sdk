/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { EngineLookup } from './engineLookup';

export interface EngineQueueSkillServicePatchQueueSkillBody {
	buckets?: EngineLookup[];
	enabled?: boolean;
	fields?: string[];
	lvl?: number;
	maxCapacity?: number;
	minCapacity?: number;
	skill?: EngineLookup;
}
