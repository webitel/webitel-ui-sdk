// DRAFT: needs native-speaker review (WS-50)
import type { ChatsV2Locale } from './en';

export default {
	composer: {
		placeholder: 'Xabar yozing...',
		attach: 'Fayllarni biriktirish',
		emoji: 'Emoji',
		send: 'Yuborish',
	},
	history: {
		today: 'Bugun',
		waitingForOperator: 'Operator qabul qilishi kutilmoqda…',
		deletedMessage: 'Xabar oʻchirildi',
		unsupportedMessage: 'Qoʻllab-quvvatlanmaydigan xabar turi',
		download: 'Yuklab olish',
	},
	systemNotice: {
		started: 'Chat boshlandi: {actor}',
		joined: 'Chatga yangi ishtirokchi: {actor}',
		accepted: 'Chat qabul qilindi: {actor}',
		transferred: 'Chat oʻtkazildi: {actor}',
		left: 'Ishtirokchi chatdan chiqdi: {actor}',
		ended: 'Chat yakunlandi: {actor}',
		unknown: 'Tizim hodisasi',
		system: 'tizim',
	},
} satisfies ChatsV2Locale;
