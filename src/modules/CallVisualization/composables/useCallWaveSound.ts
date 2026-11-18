// Web Audio routing for stereo/mono, per-channel gain, play state, and volume slider handlers.
import { reactive, ref } from 'vue';
import type WaveSurfer from 'wavesurfer.js';

type WaveSurferGetter = () => WaveSurfer | null | undefined;

const STEREO_CHANNELS = 2;

export function useCallWaveSound(getPlayer: WaveSurferGetter) {
	const volumeLeftGain = ref(1);
	const volumeRightGain = ref(1);
	const isPlaying = ref(false);

	const leftGain = reactive({
		disabled: false,
		muted: false,
	});
	const rightGain = reactive({
		disabled: true,
		muted: false,
	});

	// Audio nodes are not rendered, so they stay out of Vue reactivity.
	let audioContext: AudioContext | null = null;
	let sourceNode: MediaElementAudioSourceNode | null = null;
	let audioNodes: AudioNode[] = [];
	let leftGainNode: GainNode | null = null;
	let rightGainNode: GainNode | null = null;
	let soundListenersRegistered = false;

	function disconnectChannelNodes() {
		sourceNode?.disconnect();
		audioNodes.forEach((node) => {
			node.disconnect();
		});
		audioNodes = [];
		leftGainNode = null;
		rightGainNode = null;
	}

	// Called on every loaded file: another file of the same call can have another number of channels.
	function initChannelAudioGraph() {
		const player = getPlayer();
		if (!player) {
			return;
		}
		const channels =
			player.getDecodedData()?.numberOfChannels ?? STEREO_CHANNELS;

		// A media element can be connected to only one source node, so the source is kept for the next files.
		if (!audioContext || !sourceNode) {
			audioContext = new AudioContext();
			sourceNode = audioContext.createMediaElementSource(
				player.getMediaElement(),
			);
		}
		disconnectChannelNodes();
		leftGainNode = audioContext.createGain();
		leftGainNode.gain.value = volumeLeftGain.value;

		if (channels >= STEREO_CHANNELS) {
			const splitter = audioContext.createChannelSplitter(STEREO_CHANNELS);
			const merger = audioContext.createChannelMerger(STEREO_CHANNELS);
			rightGainNode = audioContext.createGain();
			rightGainNode.gain.value = volumeRightGain.value;
			rightGain.disabled = false;

			sourceNode.connect(splitter);
			splitter.connect(leftGainNode, 0);
			splitter.connect(rightGainNode, 1);
			leftGainNode.connect(merger, 0, 0);
			rightGainNode.connect(merger, 0, 1);
			merger.connect(audioContext.destination);
			audioNodes = [
				splitter,
				merger,
				leftGainNode,
				rightGainNode,
			];
		} else {
			rightGain.disabled = true;
			sourceNode.connect(leftGainNode);
			leftGainNode.connect(audioContext.destination);
			audioNodes = [
				leftGainNode,
			];
		}
	}

	async function resumeAudioContext() {
		if (audioContext?.state === 'suspended') {
			await audioContext.resume();
		}
	}

	async function destroyChannelAudio() {
		disconnectChannelNodes();
		sourceNode = null;
		await audioContext?.close();
		audioContext = null;
	}

	function onLoad() {
		const player = getPlayer();
		if (soundListenersRegistered || !player) {
			return;
		}
		soundListenersRegistered = true;
		player.on('play', resumeAudioContext);
	}

	function changedPlaying() {
		isPlaying.value = getPlayer()?.isPlaying() ?? false;
	}

	async function playPause() {
		await getPlayer()?.playPause();
	}

	function volumeLeftChangeHandler(value: number) {
		volumeLeftGain.value = value;
		leftGain.muted = !value;
		if (leftGainNode) {
			leftGainNode.gain.value = value;
		}
	}

	function volumeRightChangeHandler(value: number) {
		volumeRightGain.value = value;
		rightGain.muted = !value;
		if (rightGainNode) {
			rightGainNode.gain.value = value;
		}
	}

	return {
		volumeLeftGain,
		volumeRightGain,
		isPlaying,
		leftGain,
		rightGain,
		initChannelAudioGraph,
		destroyChannelAudio,
		onLoad,
		changedPlaying,
		playPause,
		volumeLeftChangeHandler,
		volumeRightChangeHandler,
	};
}
