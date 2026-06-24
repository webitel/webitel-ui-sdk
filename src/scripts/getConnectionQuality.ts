import {
	ConnectionQualityLevels,
	type ConnectionQualityLevelsType,
} from '../enums';

export const getConnectionQuality = (
	mosAvg?: number,
): ConnectionQualityLevelsType | null => {
	if (mosAvg == null) return null;
	if (mosAvg >= 4) return ConnectionQualityLevels.High;
	if (mosAvg >= 3.5) return ConnectionQualityLevels.Medium;
	return ConnectionQualityLevels.Low;
};
