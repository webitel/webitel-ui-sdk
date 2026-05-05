<template>
  <wt-popup
    v-bind="$attrs"
    class="contact-send-message"
    overflow
    @close="emit('close')"
  >
    <template #header>
      {{ t('reusable.sendMessage') }}
    </template>

    <template #main>
      <wt-textarea
        v-model:model-value="draft.message"
        :placeholder="t('objects.chat.draftPlaceholder')"
        @enter="sendMessage"
      />
    </template>
    <template #actions>
      <wt-chat-emoji
        filled
        :rounded="false"
        class="contact-send-message__emoji"
        @insert-emoji="insertEmoji"
      />

      <wt-button
        icon="chat-send"
        color="secondary"
        :disabled="!draft.message"
        wide
        @click="sendMessage"
      />
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { AgentsAPI, MessagesServiceAPI } from '@webitel/api-services/api';
import { WtChatEmoji } from '../..';
import { inject, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

interface Item {
	id: string;
	protocol: string;
	externalId: string;
	createdAt: string;
	etag: string;
	app: {
		id: string;
		name: string;
	};
	user: {
		id: string;
		name: string;
	};
}

const props = defineProps<{
	item?: Item;
	userId: string;
}>();

const emit = defineEmits([
	'close',
]);
const eventBus = inject('$eventBus');
const { t } = useI18n();

const generateNewDraft = () => {
	return {
		gateway: props.item?.app || {},
		provider: props.item?.protocol || '',
		message: '',
		agentId: null,
	};
};

const draft = ref(generateNewDraft());

async function getAgentId(params) {
	const { items } = await AgentsAPI.getList({
		...params,
		userId: props.userId,
	});
	draft.value.agentId = items[0]?.id;
}

const sendMessage = async () => {
	const response = await MessagesServiceAPI.patch({
		peers: [
			{
				via: draft.value.gateway.id,
				id: props.item?.externalId,
				type: draft.value.provider,
			},
		],
		variables: {
			agentId: draft.value.agentId,
		},
		message: {
			text: draft.value.message,
		},
	});
	if (response.failure) {
		eventBus.$emit('notification', {
			type: 'error',
			text: response.failure[0].error.message,
		});
	}
	emit('close');
};

const insertEmoji = (emoji) => {
	draft.value.message += emoji;
	document.querySelector('textarea').focus();
};

onMounted(async () => await getAgentId());
</script>

<style lang="scss" scoped>
.contact-send-message__emoji {
  :deep(.wt-chat-emoji__wrapper emoji-picker) {
    position: absolute;
    transform: translateX(-50%);
    bottom: 100%;
    left: 50%;
    z-index: 1000;
  }
}
</style>
