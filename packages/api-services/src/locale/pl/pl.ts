import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Zduplikowana wartość punktacji nie jest dozwolona',
					},
				},
			},
		},
		sqlstore: {
			onlineSkillsStore: {
				create: {
					alreadyExists: 'Typ aktywności o tej nazwie już istnieje',
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
