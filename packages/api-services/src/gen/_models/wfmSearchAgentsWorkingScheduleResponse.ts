import type { WfmAgentWorkingSchedule } from './wfmAgentWorkingSchedule';
/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import type { WfmHoliday } from './wfmHoliday';

export interface WfmSearchAgentsWorkingScheduleResponse {
	holidays?: WfmHoliday[];
	items?: WfmAgentWorkingSchedule[];
	total?: string;
}
