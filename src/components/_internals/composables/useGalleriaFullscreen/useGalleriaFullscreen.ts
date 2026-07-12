import { onMounted, onUnmounted, ref } from 'vue';

/** Vendor-prefixed fullscreen APIs not present on the standard DOM lib types. */
interface FullscreenElement extends Element {
	mozRequestFullScreen?: () => Promise<void>;
	webkitRequestFullscreen?: () => Promise<void>;
	msRequestFullscreen?: () => Promise<void>;
}

interface FullscreenDocument extends Document {
	mozCancelFullScreen?: () => Promise<void>;
	webkitExitFullscreen?: () => Promise<void>;
	msExitFullscreen?: () => Promise<void>;
}

export const useGalleriaFullscreen = () => {
	const fullScreen = ref(false);
	const toggleFullScreen = () => {
		if (fullScreen.value) {
			closeFullScreen();
		} else {
			openFullScreen();
		}
	};
	const onFullScreenChange = () => {
		fullScreen.value = !fullScreen.value;
	};
	const openFullScreen = () => {
		const element = document.querySelector<Element>(
			'.p-galleria',
		) as FullscreenElement;
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			/* Firefox */
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			/* Chrome, Safari & Opera */
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			/* IE/Edge */
			element.msRequestFullscreen();
		}
	};
	const closeFullScreen = () => {
		const doc = document as FullscreenDocument;
		if (doc.exitFullscreen) {
			doc.exitFullscreen();
		} else if (doc.mozCancelFullScreen) {
			doc.mozCancelFullScreen();
		} else if (doc.webkitExitFullscreen) {
			doc.webkitExitFullscreen();
		} else if (doc.msExitFullscreen) {
			doc.msExitFullscreen();
		}
	};
	const bindDocumentListeners = () => {
		document.addEventListener('fullscreenchange', onFullScreenChange);
		document.addEventListener('mozfullscreenchange', onFullScreenChange);
		document.addEventListener('webkitfullscreenchange', onFullScreenChange);
		document.addEventListener('msfullscreenchange', onFullScreenChange);
	};
	const unbindDocumentListeners = () => {
		document.removeEventListener('fullscreenchange', onFullScreenChange);
		document.removeEventListener('mozfullscreenchange', onFullScreenChange);
		document.removeEventListener('webkitfullscreenchange', onFullScreenChange);
		document.removeEventListener('msfullscreenchange', onFullScreenChange);
	};

	onMounted(() => {
		bindDocumentListeners();
	});
	onUnmounted(() => {
		unbindDocumentListeners();
	});
	return {
		fullScreen,
		toggleFullScreen,
	};
};
