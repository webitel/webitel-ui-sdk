/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { EngineFilterBetween } from './engineFilterBetween';
import type { EngineMemberServiceDeleteMembersBodyVariables } from './engineMemberServiceDeleteMembersBodyVariables';

export interface EngineMemberServiceDeleteMembersBody {
	agentId?: number[];
	attempts?: EngineFilterBetween;
	bucketId?: number[];
	createdAt?: EngineFilterBetween;
	destination?: string;
	id?: string[];
	ids?: string[];
	name?: string;
	numbers?: string[];
	offeringAt?: EngineFilterBetween;
	priority?: EngineFilterBetween;
	q?: string;
	size?: number;
	sort?: string;
	stopCause?: string[];
	variables?: EngineMemberServiceDeleteMembersBodyVariables;
	withoutMembers?: boolean;
}
