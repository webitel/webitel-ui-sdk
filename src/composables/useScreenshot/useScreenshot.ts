import { ref, onBeforeUnmount } from 'vue';
import eventBus from '../../scripts/eventBus';

type ScreenshotStatus = 'done' | 'error' | null;

type ScreenshotResult = {
  blob: Blob;
  file?: File;
};

type SessionLike = {
  screenshot: () => Promise<ScreenshotResult | void>;
  startRecord?: () => Promise<void> | void;
  stopRecord?: () => Promise<void> | void;
  close?: () => void;
  recordings?: boolean;
};

export function useScreenSharingSession() {
  const selectedAgentToSpyScreen = ref(null);
  const mediaStream = ref<MediaStream | null>(null);

  const screenshotStatus = ref<ScreenshotStatus>(null);
  const screenshotIsLoading = ref(false);
  const screenshotPreviewUrl = ref<string | null>(null);
  const screenshotFile = ref<File | null>(null);

  let clearStatusTimeoutId: number | undefined;

  const resetScreenshotState = () => {
    screenshotStatus.value = null;
    screenshotPreviewUrl.value = null;
    screenshotFile.value = null;
  };

  const changeScreenshotStatus = (status: ScreenshotStatus) => {
    screenshotStatus.value = status;

    window.clearTimeout(clearStatusTimeoutId);
    clearStatusTimeoutId = window.setTimeout(() => {
      resetScreenshotState();
      // because end of loading timeout is set to 1000 ms in wt-button component
      // https://webitel.atlassian.net/browse/WTEL-7992?focusedCommentId=704810 and comment why added 1s
    }, 2000);
  };

  const makeScreenshot = async (session: SessionLike | null | undefined) => {
    if (!session?.screenshot) return;

    try {
      screenshotIsLoading.value = true;

      const result = await session.screenshot();

      // для call.screenshot() є { blob, file }
      if (result && 'blob' in result && result.blob) {
        if (screenshotPreviewUrl.value) {
          URL.revokeObjectURL(screenshotPreviewUrl.value);
        }

        screenshotPreviewUrl.value = URL.createObjectURL(result.blob);
        screenshotFile.value = (result as ScreenshotResult).file ?? null;
      }

      changeScreenshotStatus('done');
    } catch (err) {
      console.error('MAKE_SCREENSHOT error', err);
      changeScreenshotStatus('error');
    } finally {
      screenshotIsLoading.value = false;
    }
  };

  const toggleRecordAction = async (session: SessionLike | null | undefined) => {
    if (!session) return;

    try {
      if (session.recordings) {
        await session.stopRecord?.();
      } else {
        await session.startRecord?.();
      }
    } catch (err: any) {
      eventBus.$emit('notification', {
        type: 'error',
        text: err?.message || 'Record error',
      });
    }
  };

  const closeScreenshot = () => {
    if (screenshotPreviewUrl.value) {
      URL.revokeObjectURL(screenshotPreviewUrl.value);
    }
    resetScreenshotState();
  };

  const closeSession = (session: SessionLike | null | undefined) => {
    if (session?.recordings) {
      session.stopRecord?.();
    }
    session?.close?.();

    mediaStream.value = null;
    selectedAgentToSpyScreen.value = null;
    closeScreenshot();
  };

  onBeforeUnmount(() => {
    if (screenshotPreviewUrl.value) {
      URL.revokeObjectURL(screenshotPreviewUrl.value);
    }
    window.clearTimeout(clearStatusTimeoutId);
  });

  return {
    selectedAgentToSpyScreen,
    mediaStream,

    screenshotStatus,
    screenshotIsLoading,
    screenshotPreviewUrl,
    screenshotFile,

    toggleRecordAction,
    makeScreenshot,
    closeScreenshot,
    closeSession,
  };
}
