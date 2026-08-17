import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Один критерій не може містити дублікати оцінок',
					},
				},
			},
		},
		sqlstore: {
			onlineSkillsStore: {
				create: {
					alreadyExists: 'Тип активності з такою назвою вже існує',
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
