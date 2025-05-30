export const DatalistStoreProvider = {
  Composable: 'composable',
  Pinia: 'pinia',
} as const;

export type DatalistStoreProviderType =
  (typeof DatalistStoreProvider)[keyof typeof DatalistStoreProvider];
