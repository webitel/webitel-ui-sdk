export const UrlProtocol = Object.freeze({
	HTTP: 'http:',
	HTTPS: 'https:',
	FTP: 'ftp:',
});

export type UrlProtocol = (typeof UrlProtocol)[keyof typeof UrlProtocol];
