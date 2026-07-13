export declare const ProcessingTableColumnType: {
    readonly TEXT: "text";
    readonly NUMBER: "number";
    readonly BOOL: "bool";
    readonly DATETIME: "datetime";
    readonly LINK: "link";
};
export type ProcessingTableColumnType = (typeof ProcessingTableColumnType)[keyof typeof ProcessingTableColumnType];
