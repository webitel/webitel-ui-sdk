/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { EngineFilterBetween } from './engineFilterBetween';
import type { EngineMemberServiceResetMembersBodyVariables } from './engineMemberServiceResetMembersBodyVariables';

export interface EngineMemberServiceResetMembersBody {
	agentId?: number[];
	bucketId?: string[];
	createdAt?: EngineFilterBetween;
	id?: string[];
	ids?: string[];
	numbers?: string[];
	priority?: EngineFilterBetween;
	stopCause?: string[];
	variables?: EngineMemberServiceResetMembersBodyVariables;
}
