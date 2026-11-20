<template>
  <article class="call-wave-comment-card">
    <wt-avatar
      :username="authorName"
      size="sm"
    />
    <div class="call-wave-comment-card__content">
      <header class="call-wave-comment-card__author">
        <p class="call-wave-comment-card__author-name typo-subtitle-2">
          {{ authorName }}
        </p>
        <p class="typo-caption">
          {{ dateLabel }}
        </p>
      </header>
      <wt-divider />
      <div class="call-wave-comment-card__range">
        <span class="typo-body-2">{{ rangeLabel }}</span>
        <wt-icon-btn
          icon="edit"
          :disabled="isEditing"
          @click="emit('edit-range')"
        />
      </div>
      <wt-divider />

      <wt-textarea
        v-if="isEditing"
        v-model:model-value="draftNote"
        class="wt-scrollbar"
        :rows="4"
        :label="t('webitelUI.callVisualization.comment', 1)"
      />
      <p
        v-else
        class="call-wave-comment-card__note wt-scrollbar typo-body-2"
      >
        {{ comment.note }}
      </p>

      <footer class="call-wave-comment-card__actions">
        <template v-if="isEditing">
          <wt-button
            size="sm"
            :loading="isSaving"
            :disabled="!draftNote.trim() || draftNote === comment.note"
            @click="saveNote"
          >
            {{ t('reusable.save') }}
          </wt-button>
          <wt-button
            size="sm"
            color="secondary"
            :disabled="isSaving"
            @click="setEditing(false)"
          >
            {{ t('reusable.cancel') }}
          </wt-button>
        </template>
        <template v-else>
          <wt-button
            size="sm"
            color="secondary"
            @click="startEditing"
          >
            {{ t('reusable.edit') }}
          </wt-button>
          <wt-button
            size="sm"
            color="secondary"
            @click="emit('delete')"
          >
            {{ t('reusable.delete') }}
          </wt-button>
        </template>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { FormatDateMode } from '../../../../enums';
import { convertDuration } from '../../../../scripts';
import { formatDate } from '../../../../utils';
import {
	annotationSecondsToInt,
	getCommentAuthorName,
} from '../../composables/useCallWaveAnnotations';
import { COMMENT_CARD_WIDTH_PX } from '../../composables/useCallWaveCommentMarkers';
import type { WaveAnnotation } from '../../types/callWave';

const props = defineProps<{
	comment: WaveAnnotation;
	saveNoteText: (note: string) => Promise<boolean>;
}>();

const emit = defineEmits<{
	'edit-range': [];
	delete: [];
	'editing-change': [
		value: boolean,
	];
}>();

const { t } = useI18n();

const cardWidth = `${COMMENT_CARD_WIDTH_PX}px`;
const isEditing = ref(false);
const isSaving = ref(false);
const draftNote = ref('');

const authorName = computed(() => getCommentAuthorName(props.comment));

const wasEdited = computed(
	() =>
		!!props.comment.updatedAt &&
		!!props.comment.createdAt &&
		props.comment.updatedAt !== props.comment.createdAt,
);

const dateLabel = computed(() => {
	const date = wasEdited.value
		? props.comment.updatedAt
		: props.comment.createdAt;
	if (!date) {
		return '';
	}
	const label = wasEdited.value
		? t('webitelUI.callVisualization.edited')
		: t('webitelUI.callVisualization.created');
	return `${label} ${formatDate(+date, FormatDateMode.DATETIME_SHORT)}`;
});

const rangeLabel = computed(
	() =>
		`${convertDuration(annotationSecondsToInt(props.comment.startSec))} - ${convertDuration(
			annotationSecondsToInt(props.comment.endSec),
		)}`,
);

function setEditing(value: boolean) {
	isEditing.value = value;
	emit('editing-change', value);
}

function startEditing() {
	draftNote.value = props.comment.note;
	setEditing(true);
}

async function saveNote() {
	isSaving.value = true;
	try {
		const isSaved = await props.saveNoteText(draftNote.value);
		if (isSaved) {
			setEditing(false);
		}
	} finally {
		isSaving.value = false;
	}
}
</script>

<style scoped>
.call-wave-comment-card {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
  box-sizing: border-box;
  width: v-bind(cardWidth);
  padding: var(--spacing-xs);
  border-radius: var(--p-overlay-popover-border-radius);
  background: var(--wt-tooltip-background-color);
  box-shadow: var(--tooltip-elevation);
}

.call-wave-comment-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-2xs);
  min-width: 0;
}

.call-wave-comment-card__range {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}

.call-wave-comment-card__author {
  min-width: 0;
}

.call-wave-comment-card__author-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.call-wave-comment-card__note {
  max-height: 120px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.call-wave-comment-card__actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xs);
}
</style>
