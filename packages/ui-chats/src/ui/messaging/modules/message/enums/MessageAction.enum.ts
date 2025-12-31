export const MessageAction = {
	ClickOnImage: "clickOnImage",
	InitializedPlayer: "initializedPlayer",
} as const;

export type MessageAction = (typeof MessageAction)[keyof typeof MessageAction];
