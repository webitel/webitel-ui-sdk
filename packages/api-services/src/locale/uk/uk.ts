import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		ccOutboundResource: {
			validatePhoneNumber: ({ linked }: MessageContext) =>
				`Файл містить некоректні номери. ${linked('validation.phoneNumberSymbolsValidator')}`,
		},
		contacts: {
			search: {
				filters: {
					reservedField:
						'Поле "{field}" має зарезервоване ім\'я. Перейменуйте його в розділі Персоналізація, щоб увімкнути фільтрацію',
				},
			},
		},
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Один критерій не може містити дублікати оцінок',
					},
				},
			},
			role: {
				conflict: {
					error: 'Довідник із такою назвою вже існує.',
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
		store: {
			sqlAuditForm: {
				save: {
					valid: {
						name: 'Анкета з такою назвою вже існує.',
					},
				},
				update: {
					valid: {
						name: ({ linked }: MessageContext) =>
							linked('backendErrors.store.sqlAuditForm.save.valid.name'),
					},
				},
			},
			sqlCalendar: {
				save: {
					valid: {
						name: 'Довідник із такою назвою вже існує.',
					},
				},
				update: {
					valid: {
						name: ({ linked }: MessageContext) =>
							linked('backendErrors.store.sqlCalendar.save.valid.name'),
					},
				},
			},
		},
	},
};
