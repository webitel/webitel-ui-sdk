// DRAFT: needs native-speaker review (WS-50)
import type { ChatsV2Locale } from './en';

export default {
	composer: {
		placeholder: 'Escribe un mensaje...',
		attach: 'Adjuntar archivos',
		emoji: 'Emoji',
		send: 'Enviar',
	},
	history: {
		today: 'Hoy',
		waitingForOperator: 'Esperando a que el operador acepte…',
		deletedMessage: 'Mensaje eliminado',
		unsupportedMessage: 'Tipo de mensaje no compatible',
		download: 'Descargar',
	},
	systemNotice: {
		started: 'Chat iniciado por {actor}',
		joined: '{actor} se unió al chat',
		accepted: '{actor} aceptó el chat',
		transferred: '{actor} transfirió el chat',
		left: '{actor} salió del chat',
		ended: 'Chat finalizado por {actor}',
		unknown: 'Evento del sistema',
		system: 'el sistema',
	},
} satisfies ChatsV2Locale;
