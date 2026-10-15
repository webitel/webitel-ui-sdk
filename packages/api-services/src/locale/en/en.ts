import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		sip: {
			gateway: {
				password: {
					invalid:
						"Password contains forbidden characters. Reserved URI symbols, whitespace, and special characters like (! * ' ( ) & $) are not allowed.",
				},
			},
		},
		ccOutboundResource: {
			validatePhoneNumber: ({ linked }: MessageContext) =>
				`File contains invalid numbers. ${linked('validation.phoneNumberSymbolsValidator')}`,
		},
		contacts: {
			search: {
				filters: {
					reservedField:
						'"{field}" is a reserved name. Rename the field in Personalization to enable filtering',
				},
			},
		},
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
		store: {
			sqlAuditForm: {
				save: {
					valid: {
						name: 'Scorecard with this name already exists.',
					},
				},
			},
		},
	},
};
