export const TtsTextType = {
	Text: 'text',
	Ssml: 'ssml',
} as const;

export type TtsTextType = (typeof TtsTextType)[keyof typeof TtsTextType];
