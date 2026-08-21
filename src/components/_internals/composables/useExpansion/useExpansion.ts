import { type Ref, ref, watch } from 'vue';

interface ExpansionEmit {
	(event: 'opened'): void;
	(event: 'closed'): void;
}

export function useExpansion(collapsed: Ref<boolean>, emit?: ExpansionEmit) {
	const opened = ref<boolean>(!collapsed.value);

	function open(): void {
		if (opened.value) return;

		opened.value = true;
		emit?.('opened');
	}

	function close(): void {
		if (!opened.value) return;

		opened.value = false;
		emit?.('closed');
	}

	function toggle(): void {
		opened.value ? close() : open();
	}

	watch(collapsed, (value) => {
		value ? close() : open();
	});

	return {
		opened,
		open,
		close,
		toggle,
	};
}
