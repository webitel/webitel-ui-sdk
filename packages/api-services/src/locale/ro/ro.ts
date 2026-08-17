const ACTIVITY_TYPE_ALREADY_EXISTS =
	'Există deja un tip de activitate cu acest nume' as const;

export default {
	backendErrors: {
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
				update: {
					alreadyExists: ACTIVITY_TYPE_ALREADY_EXISTS,
				},
				create: {
					alreadyExists: ACTIVITY_TYPE_ALREADY_EXISTS,
				},
			},
		},
	},
};
