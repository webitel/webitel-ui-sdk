export { default as CallRecordingEmpty } from './components/call-recording-empty.vue';
export { default as CallTranscript } from './components/transcript/call-transcript.vue';
export { default as CallWave } from './components/wave/call-wave.vue';
export { useCallTranscriptPhrases } from './composables/useCallTranscriptPhrases';
export { downloadTranscriptTxt } from './scripts/downloadTranscriptTxt';
export type {
	CallTranscriptCall,
	CallTranscriptItem,
	CallTranscriptRow,
} from './types/callTranscript';
export type {
	CallWaveCallRecord,
	CallWaveFile,
	WaveAnnotation,
} from './types/callWave';
