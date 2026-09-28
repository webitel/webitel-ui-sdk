import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		contacts: {
			search: {
				filters: {
					reservedField:
						'"{field}" to zarezerwowana nazwa. Zmień nazwę pola w sekcji Personalizacja, aby włączyć filtrowanie',
				},
			},
		},
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
