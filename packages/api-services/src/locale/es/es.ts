import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		contacts: {
			search: {
				filters: {
					reservedField:
						'"{field}" es un nombre reservado. Cambie el nombre del campo en Personalización para habilitar el filtrado',
				},
			},
		},
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'No se permite el valor de puntuación duplicado',
					},
				},
			},
		},
		sqlstore: {
			onlineSkillsStore: {
				create: {
					alreadyExists: 'Ya existe un tipo de actividad con este nombre',
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
