export type Id = number | string;

export interface ApiModule<Entity> {
  getList?: (
    params?: unknown,
  ) => Promise<{ items?: Entity[]; next?: boolean; aggs?: unknown }>;
  getLookup?: (
    params?: unknown,
  ) => Promise<{ items?: Entity[]; next?: boolean }>;
  get?: ({ itemId }: { itemId: Id }) => Promise<Entity>;
  add?: ({ itemInstance }: { itemInstance?: Entity }) => Promise<Entity>;
  update?: ({
    itemId,
    itemInstance,
  }: {
    itemId: Id;
    itemInstance?: Entity;
  }) => Promise<Entity>;
  patch?: ({ id, changes }: { id?: Id; changes?: Entity }) => Promise<Entity>;
  delete?: ({ itemId }: { itemId: Id }) => Promise<void>;
}
