import type { ChatsV2Locale } from './en';

export default {
	composer: {
		placeholder: 'Напишіть повідомлення...',
		attach: 'Прикріпити файли',
		emoji: 'Емодзі',
		send: 'Надіслати',
	},
	history: {
		today: 'Сьогодні',
		waitingForOperator: 'Очікування, поки оператор прийме чат…',
		deletedMessage: 'Повідомлення видалено',
		unsupportedMessage: 'Непідтримуваний тип повідомлення',
		download: 'Завантажити',
	},
	systemNotice: {
		started: 'Чат розпочато: {actor}',
		joined: 'Новий учасник чату: {actor}',
		accepted: 'Чат прийнято: {actor}',
		transferred: 'Чат переведено: {actor}',
		left: 'Учасник вийшов з чату: {actor}',
		ended: 'Чат завершено: {actor}',
		unknown: 'Системна подія',
		system: 'система',
	},
} satisfies ChatsV2Locale;
