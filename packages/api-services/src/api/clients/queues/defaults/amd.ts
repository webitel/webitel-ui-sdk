const amd = () => ({
	enabled: false,
	ai: false,
	positive: [],
	playback: {},
	allowNotSure: false,
	silenceNotSure: false,
	maxWordLength: 5000,
	maxNumberOfWords: 3,
	betweenWordsSilence: 50,
	minWordLength: 100,
	totalAnalysisTime: 5000,
	silenceThreshold: 256,
	afterGreetingSilence: 800,
	greeting: 1500,
	initialSilence: 2500,
});

export default amd;
