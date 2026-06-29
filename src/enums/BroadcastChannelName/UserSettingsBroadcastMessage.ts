export interface WebphoneBroadcastPayload {
	webrtc: boolean;
	stun: boolean;
	autoGainControl: boolean;
	echoCancellation: boolean;
	noiseSuppression: boolean;
}

export interface WebphoneBroadcastMessage {
	type: 'webphone';
	payload: WebphoneBroadcastPayload;
}

export type UserSettingsBroadcastMessage = WebphoneBroadcastMessage;
