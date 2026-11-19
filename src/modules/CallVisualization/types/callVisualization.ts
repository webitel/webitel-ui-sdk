import type { CallTranscriptCall } from './callTranscript';
import type { CallWaveCallRecord } from './callWave';

export type CallVisualizationCall = CallWaveCallRecord & CallTranscriptCall;
