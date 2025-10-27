import { computed, onMounted, onUnmounted,ref } from 'vue';

export const useGalleriaFullscreen = (galleriaRef) => {
  const containerId = computed(() => galleriaRef.value?.container?.$id);
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
    const element = document.getElementById(containerId.value)
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
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
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