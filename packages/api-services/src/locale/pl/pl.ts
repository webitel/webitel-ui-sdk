const ACTIVITY_TYPE_ALREADY_EXISTS =
	'Typ aktywności o tej nazwie już istnieje' as const;

export default {
	backendErrors: {
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
