// DRAFT: needs native-speaker review (WS-50)
import type { ChatsV2Locale } from './en';

export default {
	composer: {
		placeholder: 'Хабарлама жазыңыз...',
		attach: 'Файлдарды тіркеу',
		emoji: 'Эмодзи',
		send: 'Жіберу',
	},
	history: {
		today: 'Бүгін',
		waitingForOperator: 'Оператордың қабылдауы күтілуде…',
		deletedMessage: 'Хабарлама жойылды',
		unsupportedMessage: 'Қолдау көрсетілмейтін хабарлама түрі',
		download: 'Жүктеп алу',
	},
	systemNotice: {
		started: 'Чат басталды: {actor}',
		joined: 'Чатқа жаңа қатысушы: {actor}',
		accepted: 'Чат қабылданды: {actor}',
		transferred: 'Чат ауыстырылды: {actor}',
		left: 'Қатысушы чаттан шықты: {actor}',
		ended: 'Чат аяқталды: {actor}',
		unknown: 'Жүйелік оқиға',
		system: 'жүйе',
	},
} satisfies ChatsV2Locale;
