import type { MessageContext } from 'vue-i18n';

export default {
	// [Claude] requests failed without a server response, e.g. offline (WTEL-11052)
	requestErrors: {
		connection: 'Байланыс қатесі',
	},
	backendErrors: {
		sip: {
			gateway: {
				password: {
					invalid:
						"Құпия сөзде рұқсат етілмеген таңбалар бар. Резервтелген URI таңбалары, бос орындар және (! * ' ( ) & $) сияқты арнайы таңбаларды пайдалануға болмайды.",
				},
			},
		},
		ccOutboundResource: {
			validatePhoneNumber: ({ linked }: MessageContext) =>
				`Файлда қате нөмірлер бар. ${linked('validation.phoneNumberSymbolsValidator')}`,
		},
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
			role: {
				conflict: {
					error: 'Мұндай атаумен анықтамалық бұрыннан бар.',
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
		store: {
			sqlAuditForm: {
				save: {
					valid: {
						name: 'Мұндай атаумен сауалнама бұрыннан бар.',
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
						name: 'Мұндай атаумен анықтамалық бұрыннан бар.',
					},
				},
				update: {
					valid: {
						name: ({ linked }: MessageContext) =>
							linked('backendErrors.store.sqlCalendar.save.valid.name'),
					},
				},
			},
			sqlRoutingSchema: {
				save: {
					valid: {
						name: 'Мұндай атаумен схема бұрыннан бар',
					},
				},
			},
		},
	},
};
