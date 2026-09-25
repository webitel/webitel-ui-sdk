import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		contacts: {
			search: {
				filters: {
					reservedField:
						'"{field}" — резервтелген атау. Сүзгілеуді қосу үшін өрісті Жекелендіру бөлімінде қайта атаңыз',
				},
			},
		},
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Дубликаттық балл мәніне рұқсат етілмейді',
					},
				},
			},
		},
		sqlstore: {
			onlineSkillsStore: {
				create: {
					alreadyExists: 'Бұл атаумен белсенділік түрі бұрыннан бар',
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
