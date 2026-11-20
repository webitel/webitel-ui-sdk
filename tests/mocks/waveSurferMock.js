const waveSurferMock = (vi) => ({
	regions: [],
	setPlaybackRate: vi.fn(),
	zoom: vi.fn(),
	clearRegions: vi.fn(),
	addRegion: vi.fn((params) => params),
	backend: {
		buffer: [],
		ac: {
			sampleRate: 1,
		},
		numberOfChannels: 2,
		playbackRate: 1,
		getChannelData: (n) => n,
		getPlayedPercents: () => {},
		getPlaybackRate: () => {},
		createChannelSplitter: (n) => n,
		createChannelMerger: (n) => n,
		createGain: () => {},
		setFilters: (filters) => filters,
		setPlaybackRate: (value) => value,
		getPeaks: () => {},
	},
	getDuration: () => 10,
	enableDragSelection: () => ({}),
	disableDragSelection: () => ({}),
	isPlaying: () => true,
	playPause: () => {},
	addMarker: (marker) => marker,
	drawBuffer: () => {},
	_onResize: () => {},
	on: (event, callback) => ({
		event,
		callback,
	}),
});

export default waveSurferMock;
