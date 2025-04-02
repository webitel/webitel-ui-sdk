export const DatalistStoreProviderType = {
  Composable: 'composable',
  Pinia: 'pinia',
} as const;

export type DatalistStoreProviderType =
  (typeof DatalistStoreProviderType)[keyof typeof DatalistStoreProviderType];
