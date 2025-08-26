export const ProcessingTableColumnType = {
  TEXT: 'text',
  NUMBER: 'number',
  BOOL: 'bool',
  DATETIME: 'datetime',
  LINK: 'link',
} as const;

export type ProcessingTableColumnType =
  (typeof ProcessingTableColumnType)[keyof typeof ProcessingTableColumnType];
