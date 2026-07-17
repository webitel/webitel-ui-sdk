export declare const AccessMode: {
    readonly Forbidden: 1;
    readonly Allow: 2;
    readonly Manage: 3;
};
export type AccessMode = (typeof AccessMode)[keyof typeof AccessMode];
