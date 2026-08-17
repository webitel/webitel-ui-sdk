const ACTIVITY_TYPE_ALREADY_EXISTS =
	'Тип активности с таким названием уже существует' as const;

export default {
	backendErrors: {
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Один критерий не может содержать дубликаты оценок',
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
