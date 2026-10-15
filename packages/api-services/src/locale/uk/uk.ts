import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		sip: {
			gateway: {
				password: {
					invalid:
						"Пароль містить заборонені символи. Зарезервовані символи URI, пробіли, спецсимволи !*'()&$ не підтримуються.",
				},
			},
		},
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
			},
		},
	},
};
