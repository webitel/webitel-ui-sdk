export declare const SingleSignOnProvider: {
    readonly Microsoft: "microsoft";
    readonly Google: "google";
    readonly Facebook: "facebook";
    readonly Custom: "custom";
};
export type SingleSignOnProvider = (typeof SingleSignOnProvider)[keyof typeof SingleSignOnProvider];
