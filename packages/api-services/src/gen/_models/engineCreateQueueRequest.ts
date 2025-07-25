/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

import type { EngineCreateQueueRequestVariables } from './engineCreateQueueRequestVariables';
import type { EngineLookup } from './engineLookup';
import type { EngineTag } from './engineTag';
import type { EngineTaskProcessing } from './engineTaskProcessing';

export interface EngineCreateQueueRequest {
	tags?: EngineTag[];
	afterSchema?: EngineLookup;
	calendar?: EngineLookup;
	description?: string;
	dncList?: EngineLookup;
	doSchema?: EngineLookup;
	domainId?: string;
	enabled?: boolean;
	formSchema?: EngineLookup;
	grantee?: EngineLookup;
	name?: string;
	priority?: number;
	processing?: boolean;
	processingRenewalSec?: number;
	processingSec?: number;
	ringtone?: EngineLookup;
	schema?: EngineLookup;
	secLocateAgent?: number;
	stickyAgent?: boolean;
	strategy?: string;
	taskProcessing?: EngineTaskProcessing;
	team?: EngineLookup;
	timeout?: number;
	type?: number;
	variables?: EngineCreateQueueRequestVariables;
}
