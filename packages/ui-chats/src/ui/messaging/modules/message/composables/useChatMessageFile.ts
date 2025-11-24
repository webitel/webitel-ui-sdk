import { computed, type Ref, toRef } from 'vue';

import { ChatMessageFile } from '../../../types/ChatMessage.types';

export function useChatMessageFile(
  file: ChatMessageFile | Ref<ChatMessageFile>,
) {
  const fileRef = toRef(file);

  const type = computed(() => {
    return fileRef.value?.mime;
  });

  const isImage = computed(() => {
    const isImage = type.value?.includes('image');
    const isHEIC = type.value?.includes('heic');

    if (isHEIC) return null; //https://webitel.atlassian.net/browse/WTEL-6268

    return isImage;
  });

  const isMedia = computed(
    () => type.value?.includes('audio') || type.value?.includes('video'),
  );

  const isDocument = computed(
    () => !isMedia.value && !isImage.value && fileRef.value?.file,
  );

  return {
    isImage,
    isMedia, // audio or video
    isDocument,
  };
}
