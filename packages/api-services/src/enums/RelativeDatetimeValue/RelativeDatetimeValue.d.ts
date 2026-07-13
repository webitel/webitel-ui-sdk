export declare const RelativeDatetimeValue: {
	readonly Today: 'rdt_today';
	readonly ThisWeek: 'rdt_this_week';
	readonly ThisMonth: 'rdt_this_month';
	readonly Custom: 'rdt_custom';
};
export type RelativeDatetimeValue =
	(typeof RelativeDatetimeValue)[keyof typeof RelativeDatetimeValue];
