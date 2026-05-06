export type DocumentPiPWindow = Window &
	typeof globalThis & {
		documentPictureInPicture: {
			requestWindow: (opts: {
				width: number;
				height: number;
			}) => Promise<Window>;
		};
	};

export type MediaSnapshot = {
	el: HTMLMediaElement;
	muted: boolean;
	srcObject: MediaStream | null;
};
