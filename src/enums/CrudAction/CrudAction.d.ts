export declare const CrudAction: {
    readonly Read: "read";
    readonly Create: "create";
    readonly Update: "update";
    readonly Delete: "delete";
};
export type CrudAction = (typeof CrudAction)[keyof typeof CrudAction];
