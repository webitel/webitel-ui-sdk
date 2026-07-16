export declare const ConnectionQualityLevels: {
	readonly High: 'high';
	readonly Medium: 'medium';
	readonly Low: 'low';
};
export type ConnectionQualityLevelsType =
	(typeof ConnectionQualityLevels)[keyof typeof ConnectionQualityLevels];
