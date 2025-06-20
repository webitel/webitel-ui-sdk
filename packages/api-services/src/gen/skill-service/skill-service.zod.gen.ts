/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { z as zod } from 'zod/v4';

/**
 * @summary List of Skill
 */
export const searchSkillQueryParams = zod.object({
	page: zod.number().optional(),
	size: zod.number().optional(),
	q: zod.string().optional(),
	sort: zod.string().optional(),
	fields: zod.array(zod.string()).optional(),
	id: zod.array(zod.number()).optional(),
});

export const searchSkillResponse = zod.object({
	items: zod
		.array(
			zod.object({
				activeAgents: zod.number().optional(),
				createdAt: zod.string().optional(),
				createdBy: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				description: zod.string().optional(),
				domainId: zod.string().optional(),
				id: zod.string().optional(),
				name: zod.string().optional(),
				totalAgents: zod.number().optional(),
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

/**
 * @summary Create Skill
 */
export const createSkillBody = zod.object({
	description: zod.string().optional(),
	domainId: zod.string().optional(),
	name: zod.string().optional(),
});

export const createSkillResponse = zod.object({
	activeAgents: zod.number().optional(),
	createdAt: zod.string().optional(),
	createdBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	description: zod.string().optional(),
	domainId: zod.string().optional(),
	id: zod.string().optional(),
	name: zod.string().optional(),
	totalAgents: zod.number().optional(),
	updatedAt: zod.string().optional(),
	updatedBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

/**
 * @summary Remove Skill
 */
export const deleteSkillParams = zod.object({
	id: zod.string(),
});

export const deleteSkillQueryParams = zod.object({
	domainId: zod.string().optional(),
});

export const deleteSkillResponse = zod.object({
	activeAgents: zod.number().optional(),
	createdAt: zod.string().optional(),
	createdBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	description: zod.string().optional(),
	domainId: zod.string().optional(),
	id: zod.string().optional(),
	name: zod.string().optional(),
	totalAgents: zod.number().optional(),
	updatedAt: zod.string().optional(),
	updatedBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

/**
 * @summary Skill item
 */
export const readSkillParams = zod.object({
	id: zod.string(),
});

export const readSkillQueryParams = zod.object({
	domainId: zod.string().optional(),
});

export const readSkillResponse = zod.object({
	activeAgents: zod.number().optional(),
	createdAt: zod.string().optional(),
	createdBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	description: zod.string().optional(),
	domainId: zod.string().optional(),
	id: zod.string().optional(),
	name: zod.string().optional(),
	totalAgents: zod.number().optional(),
	updatedAt: zod.string().optional(),
	updatedBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

/**
 * @summary Update Skill
 */
export const updateSkillParams = zod.object({
	id: zod.string(),
});

export const updateSkillBody = zod.object({
	description: zod.string().optional(),
	domainId: zod.string().optional(),
	name: zod.string().optional(),
});

export const updateSkillResponse = zod.object({
	activeAgents: zod.number().optional(),
	createdAt: zod.string().optional(),
	createdBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
	description: zod.string().optional(),
	domainId: zod.string().optional(),
	id: zod.string().optional(),
	name: zod.string().optional(),
	totalAgents: zod.number().optional(),
	updatedAt: zod.string().optional(),
	updatedBy: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

export const deleteSkillAgentParams = zod.object({
	skill_id: zod.string(),
});

export const deleteSkillAgentBody = zod.object({
	agentId: zod.array(zod.string()).optional(),
	id: zod.array(zod.string()).optional(),
});

export const deleteSkillAgentResponse = zod.object({
	items: zod
		.array(
			zod.object({
				agent: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				capacity: zod.number().optional(),
				enabled: zod.boolean().optional(),
				id: zod.string().optional(),
				skill: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				team: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
			}),
		)
		.optional(),
});

/**
 * @summary For agents
SearchSkillAgent
 */
export const searchSkillAgentParams = zod.object({
	skill_id: zod.string(),
});

export const searchSkillAgentQueryParams = zod.object({
	page: zod.number().optional(),
	size: zod.number().optional(),
	q: zod.string().optional(),
	sort: zod.string().optional(),
	fields: zod.array(zod.string()).optional(),
	id: zod.array(zod.string()).optional(),
	agentId: zod.array(zod.string()).optional(),
});

export const searchSkillAgentResponse = zod.object({
	aggs: zod
		.object({
			enabled: zod.boolean().optional(),
		})
		.optional(),
	items: zod
		.array(
			zod.object({
				agent: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				capacity: zod.number().optional(),
				enabled: zod.boolean().optional(),
				id: zod.string().optional(),
				skill: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				team: zod
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

export const patchSkillAgentParams = zod.object({
	skill_id: zod.string(),
});

export const patchSkillAgentBody = zod.object({
	agentId: zod.array(zod.string()).optional(),
	capacity: zod.number().optional(),
	enabled: zod.boolean().optional(),
	fields: zod.array(zod.string()).optional(),
	id: zod.array(zod.string()).optional(),
	skill: zod
		.object({
			id: zod.string().optional(),
			name: zod.string().optional(),
		})
		.optional(),
});

export const patchSkillAgentResponse = zod.object({
	items: zod
		.array(
			zod.object({
				agent: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				capacity: zod.number().optional(),
				enabled: zod.boolean().optional(),
				id: zod.string().optional(),
				skill: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				team: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
			}),
		)
		.optional(),
});

export const createSkillAgentParams = zod.object({
	skill_id: zod.string(),
});

export const createSkillAgentBody = zod.object({
	agent: zod
		.array(
			zod.object({
				id: zod.string().optional(),
				name: zod.string().optional(),
			}),
		)
		.optional(),
	capacity: zod.number().optional(),
	enabled: zod.boolean().optional(),
});

export const createSkillAgentResponse = zod.object({
	items: zod
		.array(
			zod.object({
				agent: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				capacity: zod.number().optional(),
				enabled: zod.boolean().optional(),
				id: zod.string().optional(),
				skill: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
				team: zod
					.object({
						id: zod.string().optional(),
						name: zod.string().optional(),
					})
					.optional(),
			}),
		)
		.optional(),
});
