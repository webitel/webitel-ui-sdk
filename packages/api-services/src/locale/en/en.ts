import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'A single criteria cannot contain duplicate scores',
					},
				},
			},
		},
		sqlstore: {
			onlineSkillsStore: {
				create: {
					alreadyExists: 'Activity type with this name already exists',
				},
				update: {
					alreadyExists: ({ linked }: MessageContext) =>
						linked(
							'backendErrors.sqlstore.onlineSkillsStore.create.alreadyExists',
						),
				},
			},
		},
	},
};
