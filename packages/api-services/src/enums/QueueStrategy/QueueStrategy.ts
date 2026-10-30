export const QueueStrategy = {
	FIFO: 'fifo',
	LIFO: 'lifo',
	STRICT_FIFO: 'strict_fifo',
} as const;

export type QueueStrategy = (typeof QueueStrategy)[keyof typeof QueueStrategy];
