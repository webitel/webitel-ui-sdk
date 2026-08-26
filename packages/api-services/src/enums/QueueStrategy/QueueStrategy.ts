export const QueueStrategy = {
	FIFO: 'fifo',
	LIFO: 'lifo',
	STRICT_FIFO: 'strict_fifo',
} as const;

export type QueueStrategy = (typeof QueueStrategy)[keyof typeof QueueStrategy];

/**
 * @description
 * Select options for the queue `strategy` field, in display order.
 * `name` is the raw label the admin UI shows — not a locale key.
 */
export const QueueStrategyList = [
	{
		name: 'FIFO',
		value: QueueStrategy.FIFO,
	},
	{
		name: 'LIFO',
		value: QueueStrategy.LIFO,
	},
	{
		name: 'STRICT_FIFO',
		value: QueueStrategy.STRICT_FIFO,
	},
] as const;
