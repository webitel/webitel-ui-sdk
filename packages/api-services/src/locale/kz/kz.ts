const ACTIVITY_TYPE_ALREADY_EXISTS =
	'Бұл атаумен белсенділік түрі бұрыннан бар' as const;

export default {
	backendErrors: {
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Дубликаттық балл мәніне рұқсат етілмейді',
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
