import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Один критерий не может содержать дубликаты оценок',
					},
				},
			},
		},
		sqlstore: {
			onlineSkillsStore: {
				create: {
					alreadyExists: 'Тип активности с таким названием уже существует',
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
