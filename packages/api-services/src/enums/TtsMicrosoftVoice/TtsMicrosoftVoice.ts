export const TtsMicrosoftVoice = {
	Male: 'Male',
	Female: 'Female',
} as const;

export type TtsMicrosoftVoice =
	(typeof TtsMicrosoftVoice)[keyof typeof TtsMicrosoftVoice];
