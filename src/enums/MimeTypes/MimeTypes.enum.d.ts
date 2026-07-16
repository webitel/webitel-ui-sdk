export declare const MimeTypes: {
	readonly IMAGE_JPEG: 'image/jpeg';
	readonly IMAGE_PNG: 'image/png';
	readonly IMAGE_GIF: 'image/gif';
	readonly IMAGE_SVG_XML: 'image/svg+xml';
	readonly IMAGE_WEBP: 'image/webp';
	readonly VIDEO_MP4: 'video/mp4';
	readonly VIDEO_WEBM: 'video/webm';
	readonly VIDEO_MPEG: 'video/mpeg';
	readonly AUDIO_MPEG: 'audio/mpeg';
	readonly AUDIO_WAV: 'audio/wav';
	readonly APPLICATION_PDF: 'application/pdf';
	readonly APPLICATION_MSWORD: 'application/msword';
	readonly APPLICATION_DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
	readonly APPLICATION_XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
};
export type MimeTypes = (typeof MimeTypes)[keyof typeof MimeTypes];
