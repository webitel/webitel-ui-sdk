// DRAFT: needs native-speaker review (WS-50)
import type { ChatsV2Locale } from './en';

export default {
	composer: {
		placeholder: 'Nhập tin nhắn...',
		attach: 'Đính kèm tệp',
		emoji: 'Biểu tượng cảm xúc',
		send: 'Gửi',
	},
	history: {
		today: 'Hôm nay',
		waitingForOperator: 'Đang chờ nhân viên tiếp nhận…',
		deletedMessage: 'Tin nhắn đã bị xóa',
		unsupportedMessage: 'Loại tin nhắn không được hỗ trợ',
		download: 'Tải xuống',
	},
	systemNotice: {
		started: 'Cuộc trò chuyện được bắt đầu bởi {actor}',
		joined: '{actor} đã tham gia cuộc trò chuyện',
		accepted: '{actor} đã tiếp nhận cuộc trò chuyện',
		transferred: '{actor} đã chuyển cuộc trò chuyện',
		left: '{actor} đã rời cuộc trò chuyện',
		ended: 'Cuộc trò chuyện được kết thúc bởi {actor}',
		unknown: 'Sự kiện hệ thống',
		system: 'hệ thống',
	},
} satisfies ChatsV2Locale;
