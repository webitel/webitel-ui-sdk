/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * service.proto
 * OpenAPI spec version: version not set
 */
import type { GeneralLookup } from './generalLookup';

export interface CasesSLACondition {
	createdAt?: string;
	createdBy?: GeneralLookup;
	id?: string;
	name?: string;
	priorities?: GeneralLookup[];
	reactionTime?: string;
	resolutionTime?: string;
	slaId?: string;
	updatedAt?: string;
	updatedBy?: GeneralLookup;
}
