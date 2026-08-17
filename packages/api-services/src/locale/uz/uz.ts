const ACTIVITY_TYPE_ALREADY_EXISTS =
	'Bu nomdagi faoliyat turi allaqachon mavjud' as const;

export default {
	backendErrors: {
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
