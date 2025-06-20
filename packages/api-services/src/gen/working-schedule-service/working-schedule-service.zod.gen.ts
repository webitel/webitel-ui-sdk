/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { z as zod } from 'zod/v4';

export const workingScheduleServiceSearchWorkingScheduleQueryParams =
	zod.object({
		q: zod.string().optional(),
		page: zod.number().optional(),
		size: zod.number().optional(),
		sort: zod.string().optional(),
		fields: zod.array(zod.string()).optional(),
	});

export const workingScheduleServiceSearchWorkingScheduleResponseItemsItemStateDefault =
	'WORKING_SCHEDULE_STATE_UNSPECIFIED';

export const workingScheduleServiceSearchWorkingScheduleResponse = zod.object({
	items: zod
		.array(
			zod.object({
				agents: zod
					.array(
						zod.object({
							id: zod.string().optional(),
							name: zod.string().optional(),
						}),
					)
					.optional(),
				blockOutsideActivity: zod.boolean().optional(),
				calendar: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				createdAt: zod.string().optional(),
				createdBy: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				domainId: zod.string().optional(),
				endDateAt: zod.string().optional(),
				endTimeAt: zod.string().optional(),
				extraSkills: zod
					.array(
						zod.object({
							id: zod.string().optional(),
							name: zod.string().optional(),
						}),
					)
					.optional(),
				id: zod.string().optional(),
				name: zod.string().optional(),
				startDateAt: zod.string().optional(),
				startTimeAt: zod.string().optional(),
				state: zod
					.enum([
						'WORKING_SCHEDULE_STATE_UNSPECIFIED',
						'WORKING_SCHEDULE_STATE_ACTIVE',
						'WORKING_SCHEDULE_STATE_PENDING',
						'WORKING_SCHEDULE_STATE_DRAFT',
						'WORKING_SCHEDULE_STATE_ARCHIVED',
					])
					.default(
						workingScheduleServiceSearchWorkingScheduleResponseItemsItemStateDefault,
					),
				team: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				totalAgents: zod.string().optional(),
				updatedAt: zod.string().optional(),
				updatedBy: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
			}),
		)
		.optional(),
	next: zod.boolean().optional(),
});

export const workingScheduleServiceCreateWorkingScheduleBodyItemStateDefault =
	'WORKING_SCHEDULE_STATE_UNSPECIFIED';

export const workingScheduleServiceCreateWorkingScheduleBody = zod.object({
	item: zod
		.object({
			agents: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			blockOutsideActivity: zod.boolean().optional(),
			calendar: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			createdAt: zod.string().optional(),
			createdBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			domainId: zod.string().optional(),
			endDateAt: zod.string().optional(),
			endTimeAt: zod.string().optional(),
			extraSkills: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			id: zod.string().optional(),
			name: zod.string().optional(),
			startDateAt: zod.string().optional(),
			startTimeAt: zod.string().optional(),
			state: zod
				.enum([
					'WORKING_SCHEDULE_STATE_UNSPECIFIED',
					'WORKING_SCHEDULE_STATE_ACTIVE',
					'WORKING_SCHEDULE_STATE_PENDING',
					'WORKING_SCHEDULE_STATE_DRAFT',
					'WORKING_SCHEDULE_STATE_ARCHIVED',
				])
				.default(
					workingScheduleServiceCreateWorkingScheduleBodyItemStateDefault,
				),
			team: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			totalAgents: zod.string().optional(),
			updatedAt: zod.string().optional(),
			updatedBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
		})
		.optional(),
});

export const workingScheduleServiceCreateWorkingScheduleResponseItemStateDefault =
	'WORKING_SCHEDULE_STATE_UNSPECIFIED';

export const workingScheduleServiceCreateWorkingScheduleResponse = zod.object({
	item: zod
		.object({
			agents: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			blockOutsideActivity: zod.boolean().optional(),
			calendar: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			createdAt: zod.string().optional(),
			createdBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			domainId: zod.string().optional(),
			endDateAt: zod.string().optional(),
			endTimeAt: zod.string().optional(),
			extraSkills: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			id: zod.string().optional(),
			name: zod.string().optional(),
			startDateAt: zod.string().optional(),
			startTimeAt: zod.string().optional(),
			state: zod
				.enum([
					'WORKING_SCHEDULE_STATE_UNSPECIFIED',
					'WORKING_SCHEDULE_STATE_ACTIVE',
					'WORKING_SCHEDULE_STATE_PENDING',
					'WORKING_SCHEDULE_STATE_DRAFT',
					'WORKING_SCHEDULE_STATE_ARCHIVED',
				])
				.default(
					workingScheduleServiceCreateWorkingScheduleResponseItemStateDefault,
				),
			team: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			totalAgents: zod.string().optional(),
			updatedAt: zod.string().optional(),
			updatedBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
		})
		.optional(),
});

export const workingScheduleServiceDeleteWorkingScheduleParams = zod.object({
	id: zod.string(),
});

export const workingScheduleServiceDeleteWorkingScheduleResponse = zod.object({
	id: zod.string().optional(),
});

export const workingScheduleServiceReadWorkingScheduleParams = zod.object({
	id: zod.string(),
});

export const workingScheduleServiceReadWorkingScheduleQueryParams = zod.object({
	fields: zod.array(zod.string()).optional(),
});

export const workingScheduleServiceReadWorkingScheduleResponseItemStateDefault =
	'WORKING_SCHEDULE_STATE_UNSPECIFIED';

export const workingScheduleServiceReadWorkingScheduleResponse = zod.object({
	item: zod
		.object({
			agents: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			blockOutsideActivity: zod.boolean().optional(),
			calendar: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			createdAt: zod.string().optional(),
			createdBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			domainId: zod.string().optional(),
			endDateAt: zod.string().optional(),
			endTimeAt: zod.string().optional(),
			extraSkills: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			id: zod.string().optional(),
			name: zod.string().optional(),
			startDateAt: zod.string().optional(),
			startTimeAt: zod.string().optional(),
			state: zod
				.enum([
					'WORKING_SCHEDULE_STATE_UNSPECIFIED',
					'WORKING_SCHEDULE_STATE_ACTIVE',
					'WORKING_SCHEDULE_STATE_PENDING',
					'WORKING_SCHEDULE_STATE_DRAFT',
					'WORKING_SCHEDULE_STATE_ARCHIVED',
				])
				.default(
					workingScheduleServiceReadWorkingScheduleResponseItemStateDefault,
				),
			team: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			totalAgents: zod.string().optional(),
			updatedAt: zod.string().optional(),
			updatedBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
		})
		.optional(),
});

export const workingScheduleServiceUpdateWorkingScheduleAddAgentsParams =
	zod.object({
		id: zod.string(),
	});

export const workingScheduleServiceUpdateWorkingScheduleAddAgentsBody =
	zod.object({
		agents: zod
			.array(
				zod.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				}),
			)
			.optional(),
	});

export const workingScheduleServiceUpdateWorkingScheduleAddAgentsResponse =
	zod.object({
		agents: zod
			.array(
				zod.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				}),
			)
			.optional(),
	});

export const workingScheduleServiceUpdateWorkingScheduleRemoveAgentParams =
	zod.object({
		id: zod.string(),
		agent_id: zod.string(),
	});

export const workingScheduleServiceUpdateWorkingScheduleRemoveAgentResponse =
	zod.object({
		id: zod.string().optional(),
	});

export const workingScheduleServiceReadWorkingScheduleForecastParams =
	zod.object({
		id: zod.string(),
	});

export const workingScheduleServiceReadWorkingScheduleForecastQueryParams =
	zod.object({
		dateFrom: zod.string().optional(),
		dateTo: zod.string().optional(),
	});

export const workingScheduleServiceReadWorkingScheduleForecastResponse =
	zod.object({
		items: zod
			.record(
				zod.string(),
				zod.object({
					forecast: zod
						.array(
							zod.object({
								agents: zod.string().optional(),
								hour: zod.string().optional(),
							}),
						)
						.optional(),
				}),
			)
			.optional(),
	});

export const workingScheduleServiceUpdateWorkingScheduleParams = zod.object({
	'item.id': zod.string(),
});

export const workingScheduleServiceUpdateWorkingScheduleBodyItemStateDefault =
	'WORKING_SCHEDULE_STATE_UNSPECIFIED';

export const workingScheduleServiceUpdateWorkingScheduleBody = zod.object({
	item: zod
		.object({
			agents: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			blockOutsideActivity: zod.boolean().optional(),
			calendar: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			createdAt: zod.string().optional(),
			createdBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			domainId: zod.string().optional(),
			endDateAt: zod.string().optional(),
			endTimeAt: zod.string().optional(),
			extraSkills: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			name: zod.string().optional(),
			startDateAt: zod.string().optional(),
			startTimeAt: zod.string().optional(),
			state: zod
				.enum([
					'WORKING_SCHEDULE_STATE_UNSPECIFIED',
					'WORKING_SCHEDULE_STATE_ACTIVE',
					'WORKING_SCHEDULE_STATE_PENDING',
					'WORKING_SCHEDULE_STATE_DRAFT',
					'WORKING_SCHEDULE_STATE_ARCHIVED',
				])
				.default(
					workingScheduleServiceUpdateWorkingScheduleBodyItemStateDefault,
				),
			team: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			totalAgents: zod.string().optional(),
			updatedAt: zod.string().optional(),
			updatedBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
		})
		.optional(),
});

export const workingScheduleServiceUpdateWorkingScheduleResponseItemStateDefault =
	'WORKING_SCHEDULE_STATE_UNSPECIFIED';

export const workingScheduleServiceUpdateWorkingScheduleResponse = zod.object({
	item: zod
		.object({
			agents: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			blockOutsideActivity: zod.boolean().optional(),
			calendar: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			createdAt: zod.string().optional(),
			createdBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			domainId: zod.string().optional(),
			endDateAt: zod.string().optional(),
			endTimeAt: zod.string().optional(),
			extraSkills: zod
				.array(
					zod.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					}),
				)
				.optional(),
			id: zod.string().optional(),
			name: zod.string().optional(),
			startDateAt: zod.string().optional(),
			startTimeAt: zod.string().optional(),
			state: zod
				.enum([
					'WORKING_SCHEDULE_STATE_UNSPECIFIED',
					'WORKING_SCHEDULE_STATE_ACTIVE',
					'WORKING_SCHEDULE_STATE_PENDING',
					'WORKING_SCHEDULE_STATE_DRAFT',
					'WORKING_SCHEDULE_STATE_ARCHIVED',
				])
				.default(
					workingScheduleServiceUpdateWorkingScheduleResponseItemStateDefault,
				),
			team: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
			totalAgents: zod.string().optional(),
			updatedAt: zod.string().optional(),
			updatedBy: zod
				.object({
					id: zod.string().optional(),
					name: zod.string().optional(),
				})
				.optional(),
		})
		.optional(),
});
