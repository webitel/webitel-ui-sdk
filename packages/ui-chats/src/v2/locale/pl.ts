// DRAFT: needs native-speaker review (WS-50)
import type { ChatsV2Locale } from './en';

export default {
	composer: {
		placeholder: 'Napisz wiadomość...',
		attach: 'Załącz pliki',
		emoji: 'Emoji',
		send: 'Wyślij',
	},
	history: {
		today: 'Dzisiaj',
		waitingForOperator: 'Oczekiwanie na przyjęcie przez operatora…',
		deletedMessage: 'Wiadomość usunięta',
		unsupportedMessage: 'Nieobsługiwany typ wiadomości',
		download: 'Pobierz',
	},
	systemNotice: {
		started: 'Czat rozpoczęty: {actor}',
		joined: 'Nowy uczestnik czatu: {actor}',
		accepted: 'Czat przyjęty: {actor}',
		transferred: 'Czat przekazany: {actor}',
		left: 'Uczestnik opuścił czat: {actor}',
		ended: 'Czat zakończony: {actor}',
		unknown: 'Zdarzenie systemowe',
		system: 'system',
	},
} satisfies ChatsV2Locale;
