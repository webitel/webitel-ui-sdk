import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		sip: {
			gateway: {
				password: {
					invalid:
						"Parolda ruxsat etilmagan belgilar mavjud. Rezervlangan URI belgilari, bo'sh joylar va (! * ' ( ) & $) kabi maxsus belgilardan foydalanish mumkin emas.",
				},
			},
		},
		ccOutboundResource: {
			validatePhoneNumber: ({ linked }: MessageContext) =>
				`Faylda noto'g'ri raqamlar mavjud. ${linked('validation.phoneNumberSymbolsValidator')}`,
		},
		contacts: {
			search: {
				filters: {
					reservedField:
						'"{field}" zaxiralangan nom. Filtrlashni yoqish uchun maydonni Shaxsiylashtirish bo\'limida qayta nomlang',
				},
			},
		},
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Takrorlangan ball qiymatiga ruxsat berilmaydi',
					},
				},
			},
		},
		sqlstore: {
			onlineSkillsStore: {
				create: {
					alreadyExists: 'Bu nomdagi faoliyat turi allaqachon mavjud',
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
						name: 'Bu nomdagi baholash varaqasi allaqachon mavjud.',
					},
				},
			},
		},
	},
};
