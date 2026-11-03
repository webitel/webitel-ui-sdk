import type { MessageContext } from 'vue-i18n';

export default {
	backendErrors: {
		sip: {
			gateway: {
				password: {
					invalid:
						"Mật khẩu chứa ký tự không hợp lệ. Không được phép dùng các ký hiệu URI dành riêng, khoảng trắng và ký tự đặc biệt như (! * ' ( ) & $).",
				},
			},
		},
		ccOutboundResource: {
			validatePhoneNumber: ({ linked }: MessageContext) =>
				`Tệp chứa số không hợp lệ. ${linked('validation.phoneNumberSymbolsValidator')}`,
		},
		contacts: {
			search: {
				filters: {
					reservedField:
						'"{field}" là tên dành riêng. Hãy đổi tên trường trong mục Cá nhân hóa để bật lọc',
				},
			},
		},
		app: {
			auditForm: {
				isValid: {
					option: {
						duplicateScore: 'Giá trị điểm trùng lặp không được phép',
					},
				},
			},
			role: {
				conflict: {
					error: 'Danh mục với tên này đã tồn tại.',
				},
			},
		},
		sqlstore: {
			onlineSkillsStore: {
				create: {
					alreadyExists: 'Loại hoạt động với tên này đã tồn tại',
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
						name: 'Phiếu chấm điểm với tên này đã tồn tại.',
					},
				},
				update: {
					valid: {
						name: ({ linked }: MessageContext) =>
							linked('backendErrors.store.sqlAuditForm.save.valid.name'),
					},
				},
			},
			sqlCalendar: {
				save: {
					valid: {
						name: 'Danh mục với tên này đã tồn tại.',
					},
				},
				update: {
					valid: {
						name: ({ linked }: MessageContext) =>
							linked('backendErrors.store.sqlCalendar.save.valid.name'),
					},
				},
			},
		},
	},
};
