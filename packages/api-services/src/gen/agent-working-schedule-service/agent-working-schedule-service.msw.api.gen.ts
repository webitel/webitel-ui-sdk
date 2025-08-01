/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';
import type {
	WfmCreateAgentsWorkingScheduleShiftsResponse,
	WfmSearchAgentsWorkingScheduleResponse,
} from '.././_models';
import { WfmAbsenceType } from '.././_models';

export const getAgentWorkingScheduleServiceSearchAgentsWorkingScheduleResponseMock =
	(
		overrideResponse: Partial<WfmSearchAgentsWorkingScheduleResponse> = {},
	): WfmSearchAgentsWorkingScheduleResponse => ({
		holidays: faker.helpers.arrayElement([
			Array.from(
				{ length: faker.number.int({ min: 1, max: 10 }) },
				(_, i) => i + 1,
			).map(() => ({
				date: faker.helpers.arrayElement([
					faker.string.alpha({ length: { min: 10, max: 20 } }),
					undefined,
				]),
				name: faker.helpers.arrayElement([
					faker.string.alpha({ length: { min: 10, max: 20 } }),
					undefined,
				]),
			})),
			undefined,
		]),
		items: faker.helpers.arrayElement([
			Array.from(
				{ length: faker.number.int({ min: 1, max: 10 }) },
				(_, i) => i + 1,
			).map(() => ({
				agent: faker.helpers.arrayElement([
					{
						id: faker.helpers.arrayElement([
							faker.string.alpha({ length: { min: 10, max: 20 } }),
							undefined,
						]),
						name: faker.helpers.arrayElement([
							faker.string.alpha({ length: { min: 10, max: 20 } }),
							undefined,
						]),
					},
					undefined,
				]),
				schedule: faker.helpers.arrayElement([
					Array.from(
						{ length: faker.number.int({ min: 1, max: 10 }) },
						(_, i) => i + 1,
					).map(() => ({
						absence: faker.helpers.arrayElement([
							faker.helpers.arrayElement(Object.values(WfmAbsenceType)),
							undefined,
						]),
						date: faker.helpers.arrayElement([
							faker.string.alpha({ length: { min: 10, max: 20 } }),
							undefined,
						]),
						locked: faker.helpers.arrayElement([
							faker.datatype.boolean(),
							undefined,
						]),
						shift: faker.helpers.arrayElement([
							{
								createdAt: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								createdBy: faker.helpers.arrayElement([
									{
										id: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										name: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
									},
									undefined,
								]),
								domainId: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								end: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								id: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								pauses: faker.helpers.arrayElement([
									Array.from(
										{ length: faker.number.int({ min: 1, max: 10 }) },
										(_, i) => i + 1,
									).map(() => ({
										cause: faker.helpers.arrayElement([
											{
												id: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
												name: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
											},
											undefined,
										]),
										createdAt: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										createdBy: faker.helpers.arrayElement([
											{
												id: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
												name: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
											},
											undefined,
										]),
										domainId: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										end: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										id: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										start: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										updatedAt: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										updatedBy: faker.helpers.arrayElement([
											{
												id: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
												name: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
											},
											undefined,
										]),
									})),
									undefined,
								]),
								skills: faker.helpers.arrayElement([
									Array.from(
										{ length: faker.number.int({ min: 1, max: 10 }) },
										(_, i) => i + 1,
									).map(() => ({
										capacity: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										enabled: faker.helpers.arrayElement([
											faker.datatype.boolean(),
											undefined,
										]),
										skill: faker.helpers.arrayElement([
											{
												id: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
												name: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
											},
											undefined,
										]),
									})),
									undefined,
								]),
								start: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								updatedAt: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								updatedBy: faker.helpers.arrayElement([
									{
										id: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										name: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
									},
									undefined,
								]),
							},
							undefined,
						]),
					})),
					undefined,
				]),
			})),
			undefined,
		]),
		total: faker.helpers.arrayElement([
			faker.string.alpha({ length: { min: 10, max: 20 } }),
			undefined,
		]),
		...overrideResponse,
	});

export const getAgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsResponseMock =
	(
		overrideResponse: Partial<WfmCreateAgentsWorkingScheduleShiftsResponse> = {},
	): WfmCreateAgentsWorkingScheduleShiftsResponse => ({
		items: faker.helpers.arrayElement([
			Array.from(
				{ length: faker.number.int({ min: 1, max: 10 }) },
				(_, i) => i + 1,
			).map(() => ({
				agent: faker.helpers.arrayElement([
					{
						id: faker.helpers.arrayElement([
							faker.string.alpha({ length: { min: 10, max: 20 } }),
							undefined,
						]),
						name: faker.helpers.arrayElement([
							faker.string.alpha({ length: { min: 10, max: 20 } }),
							undefined,
						]),
					},
					undefined,
				]),
				schedule: faker.helpers.arrayElement([
					Array.from(
						{ length: faker.number.int({ min: 1, max: 10 }) },
						(_, i) => i + 1,
					).map(() => ({
						absence: faker.helpers.arrayElement([
							faker.helpers.arrayElement(Object.values(WfmAbsenceType)),
							undefined,
						]),
						date: faker.helpers.arrayElement([
							faker.string.alpha({ length: { min: 10, max: 20 } }),
							undefined,
						]),
						locked: faker.helpers.arrayElement([
							faker.datatype.boolean(),
							undefined,
						]),
						shift: faker.helpers.arrayElement([
							{
								createdAt: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								createdBy: faker.helpers.arrayElement([
									{
										id: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										name: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
									},
									undefined,
								]),
								domainId: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								end: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								id: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								pauses: faker.helpers.arrayElement([
									Array.from(
										{ length: faker.number.int({ min: 1, max: 10 }) },
										(_, i) => i + 1,
									).map(() => ({
										cause: faker.helpers.arrayElement([
											{
												id: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
												name: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
											},
											undefined,
										]),
										createdAt: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										createdBy: faker.helpers.arrayElement([
											{
												id: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
												name: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
											},
											undefined,
										]),
										domainId: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										end: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										id: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										start: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										updatedAt: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										updatedBy: faker.helpers.arrayElement([
											{
												id: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
												name: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
											},
											undefined,
										]),
									})),
									undefined,
								]),
								skills: faker.helpers.arrayElement([
									Array.from(
										{ length: faker.number.int({ min: 1, max: 10 }) },
										(_, i) => i + 1,
									).map(() => ({
										capacity: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										enabled: faker.helpers.arrayElement([
											faker.datatype.boolean(),
											undefined,
										]),
										skill: faker.helpers.arrayElement([
											{
												id: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
												name: faker.helpers.arrayElement([
													faker.string.alpha({ length: { min: 10, max: 20 } }),
													undefined,
												]),
											},
											undefined,
										]),
									})),
									undefined,
								]),
								start: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								updatedAt: faker.helpers.arrayElement([
									faker.string.alpha({ length: { min: 10, max: 20 } }),
									undefined,
								]),
								updatedBy: faker.helpers.arrayElement([
									{
										id: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
										name: faker.helpers.arrayElement([
											faker.string.alpha({ length: { min: 10, max: 20 } }),
											undefined,
										]),
									},
									undefined,
								]),
							},
							undefined,
						]),
					})),
					undefined,
				]),
			})),
			undefined,
		]),
		...overrideResponse,
	});

export const getAgentWorkingScheduleServiceSearchAgentsWorkingScheduleMockHandler =
	(
		overrideResponse?:
			| WfmSearchAgentsWorkingScheduleResponse
			| ((
					info: Parameters<Parameters<typeof http.get>[1]>[0],
			  ) =>
					| Promise<WfmSearchAgentsWorkingScheduleResponse>
					| WfmSearchAgentsWorkingScheduleResponse),
	) => {
		return http.get(
			'*/wfm/agents/working_schedules/:workingScheduleId',
			async (info) => {
				await delay(1000);

				return new HttpResponse(
					JSON.stringify(
						overrideResponse !== undefined
							? typeof overrideResponse === 'function'
								? await overrideResponse(info)
								: overrideResponse
							: getAgentWorkingScheduleServiceSearchAgentsWorkingScheduleResponseMock(),
					),
					{ status: 200, headers: { 'Content-Type': 'application/json' } },
				);
			},
		);
	};

export const getAgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsMockHandler =
	(
		overrideResponse?:
			| WfmCreateAgentsWorkingScheduleShiftsResponse
			| ((
					info: Parameters<Parameters<typeof http.post>[1]>[0],
			  ) =>
					| Promise<WfmCreateAgentsWorkingScheduleShiftsResponse>
					| WfmCreateAgentsWorkingScheduleShiftsResponse),
	) => {
		return http.post(
			'*/wfm/agents/working_schedules/:workingScheduleId',
			async (info) => {
				await delay(1000);

				return new HttpResponse(
					JSON.stringify(
						overrideResponse !== undefined
							? typeof overrideResponse === 'function'
								? await overrideResponse(info)
								: overrideResponse
							: getAgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsResponseMock(),
					),
					{ status: 200, headers: { 'Content-Type': 'application/json' } },
				);
			},
		);
	};
export const getAgentWorkingScheduleServiceMock = () => [
	getAgentWorkingScheduleServiceSearchAgentsWorkingScheduleMockHandler(),
	getAgentWorkingScheduleServiceCreateAgentsWorkingScheduleShiftsMockHandler(),
];
