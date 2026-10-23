import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
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
			role: {
				conflict: {
					error: "Bu nomdagi ma'lumotnoma allaqachon mavjud.",
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
			sqlCalendar: {
				save: {
					valid: {
						name: "Bu nomdagi ma'lumotnoma allaqachon mavjud.",
					},
				},
			},
		},
	},
};
