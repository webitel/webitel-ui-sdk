import type { ChatsV2Locale } from './en';

export default {
	composer: {
		placeholder: 'Напишите сообщение...',
		attach: 'Прикрепить файлы',
		emoji: 'Эмодзи',
		send: 'Отправить',
	},
	history: {
		today: 'Сегодня',
		waitingForOperator: 'Ожидание, пока оператор примет чат…',
		deletedMessage: 'Сообщение удалено',
		unsupportedMessage: 'Неподдерживаемый тип сообщения',
		download: 'Скачать',
	},
	systemNotice: {
		started: 'Чат начат: {actor}',
		joined: 'Новый участник чата: {actor}',
		accepted: 'Чат принят: {actor}',
		transferred: 'Чат переведён: {actor}',
		left: 'Участник вышел из чата: {actor}',
		ended: 'Чат завершён: {actor}',
		unknown: 'Системное событие',
		system: 'система',
	},
} satisfies ChatsV2Locale;
