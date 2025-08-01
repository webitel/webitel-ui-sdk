/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */

import type { EngineActiveCallVariables } from './engineActiveCallVariables';
import type { EngineEndpoint } from './engineEndpoint';
import type { EngineLookup } from './engineLookup';

export interface EngineActiveCall {
	agent?: EngineLookup;
	answeredAt?: string;
	appId?: string;
	billSec?: number;
	blindTransfer?: string;
	bridgedAt?: string;
	bridgedId?: string;
	createdAt?: string;
	destination?: string;
	direction?: string;
	display?: string;
	duration?: number;
	extension?: string;
	from?: EngineEndpoint;
	gateway?: EngineLookup;
	holdSec?: number;
	id?: string;
	joinedAt?: string;
	leavingAt?: string;
	member?: EngineLookup;
	parentId?: string;
	queue?: EngineLookup;
	queueBridgedAt?: string;
	queueDurationSec?: number;
	queueWaitSec?: number;
	reportingAt?: string;
	reportingSec?: number;
	state?: string;
	supervisor?: EngineLookup[];
	team?: EngineLookup;
	timestamp?: string;
	to?: EngineEndpoint;
	type?: string;
	user?: EngineLookup;
	variables?: EngineActiveCallVariables;
	waitSec?: number;
}
