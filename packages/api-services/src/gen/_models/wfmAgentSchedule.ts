/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WfmAbsenceType } from './wfmAbsenceType';
import type { WfmAgentScheduleShift } from './wfmAgentScheduleShift';

export interface WfmAgentSchedule {
	absence?: WfmAbsenceType;
	date?: string;
	locked?: boolean;
	shift?: WfmAgentScheduleShift;
}
