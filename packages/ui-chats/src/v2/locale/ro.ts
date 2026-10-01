// DRAFT: needs native-speaker review (WS-50)
import type { ChatsV2Locale } from './en';

export default {
	composer: {
		placeholder: 'Scrie un mesaj...',
		attach: 'Atașează fișiere',
		emoji: 'Emoji',
		send: 'Trimite',
	},
	history: {
		today: 'Astăzi',
		waitingForOperator: 'Se așteaptă acceptarea de către operator…',
		deletedMessage: 'Mesaj șters',
		unsupportedMessage: 'Tip de mesaj neacceptat',
		download: 'Descarcă',
	},
	systemNotice: {
		started: 'Chat început de {actor}',
		joined: '{actor} s-a alăturat chatului',
		accepted: '{actor} a acceptat chatul',
		transferred: '{actor} a transferat chatul',
		left: '{actor} a părăsit chatul',
		ended: 'Chat încheiat de {actor}',
		unknown: 'Eveniment de sistem',
		system: 'sistem',
	},
} satisfies ChatsV2Locale;
