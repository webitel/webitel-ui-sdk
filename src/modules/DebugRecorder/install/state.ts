// what the recorder holds while the page lives; one object, so every file of this folder can change it
import type { RecorderSink } from '../sink';
import type { RecorderApp, RecordFn } from '../types';

export const PREFIX = '[debug-recorder]';

// module state: one object, so the files of this folder can all change it
export const state: {
	app: RecorderApp | null;
	sink: RecorderSink | null;
	hideIndicator: (() => void) | null;
	collectorsFailed: string[] | null;
	expiryTimer: ReturnType<typeof setInterval> | null;
} = {
	app: null,
	sink: null,
	hideIndicator: null,
	collectorsFailed: null,
	expiryTimer: null,
};

// the copy of this module that records; an app may load the module twice, and any copy must be able to stop it
export interface RecorderRuntime {
	stop(): Promise<void>;
}

export const RUNTIME_KEY = Symbol.for('webitel.ui-sdk.debug-recorder');

export const runtimeHolder = globalThis as Record<
	symbol,
	RecorderRuntime | undefined
>;

// collectors wrap globals once per page and write to whichever sink is current
export const recordToSink: RecordFn = (ch, type, data) =>
	state.sink?.record(ch, type, data);
