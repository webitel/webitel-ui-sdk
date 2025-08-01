/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

import type { EngineLookup } from './engineLookup';
import type { EngineOutboundResourceParameters } from './engineOutboundResourceParameters';
import type { EngineOutboundResourceVariables } from './engineOutboundResourceVariables';

export interface EngineOutboundResource {
	parameters?: EngineOutboundResourceParameters;
	createdAt?: string;
	createdBy?: EngineLookup;
	description?: string;
	domainId?: string;
	enabled?: boolean;
	errorIds?: string[];
	failureDialDelay?: number;
	gateway?: EngineLookup;
	id?: string;
	lastErrorAt?: string;
	lastErrorId?: string;
	limit?: number;
	maxSuccessivelyErrors?: number;
	name?: string;
	number?: string;
	patterns?: string[];
	reserve?: boolean;
	rps?: number;
	successivelyErrors?: number;
	updatedAt?: string;
	updatedBy?: EngineLookup;
	variables?: EngineOutboundResourceVariables;
}
