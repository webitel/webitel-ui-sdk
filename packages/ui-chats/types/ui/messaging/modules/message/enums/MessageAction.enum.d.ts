export declare const MessageAction: {
    readonly ClickOnImage: "clickOnImage";
    readonly InitializedPlayer: "initializedPlayer";
};
export type MessageAction = (typeof MessageAction)[keyof typeof MessageAction];
