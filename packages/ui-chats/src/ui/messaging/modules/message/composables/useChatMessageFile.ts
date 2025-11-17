import { computed, toRef, type Ref } from 'vue';
import { ChatMessageFile } from '../../../types/ChatMessage.types';

export function useChatMessageFile(
  file: ChatMessageFile | Ref<ChatMessageFile>,
) {
  const fileRef = toRef(file);
  
  const type = computed(() => {
    return fileRef.value.mime;
  });

  const image = computed(() => {
    const isImage = type.value?.includes('image');
    const isHEIC = type.value?.includes('heic');

    if (isHEIC) return null;

    return isImage && fileRef.value; //https://webitel.atlassian.net/browse/WTEL-6268
  });

  const media = computed(() => {
    const isMedia = type.value?.includes('audio') || type.value?.includes('video');
    return isMedia && fileRef.value;
  });

  const document = computed(() => {
    return !media.value && !image.value && fileRef.value;
  });

  return {
    image,
    media,
    document,
  };
}
