import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		contacts: {
			search: {
				filters: {
					reservedField:
						'"{field}" este un nume rezervat. Redenumiți câmpul în Personalizare pentru a activa filtrarea',
				},
			},
		},
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Valoarea scorului duplicat nu este permisă',
					},
				},
			},
		},
		sqlstore: {
			onlineSkillsStore: {
				create: {
					alreadyExists: 'Există deja un tip de activitate cu acest nume',
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
