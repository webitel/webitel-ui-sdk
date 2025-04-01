export const DatalistStoreProviderType = {
  Composable: 'composable',
  Pinia: 'pinia',
} as const;

export type StoreProvider =
  (typeof DatalistStoreProviderType)[keyof typeof DatalistStoreProviderType];
