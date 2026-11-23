import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import i18n from '../../../locale/i18n';
import DebugRecorderIndicator from '../components/debug-recorder-indicator.vue';

function setup() {
	const actions = {
		download: vi.fn(async () => {}),
		stop: vi.fn(async () => {}),
		stats: vi.fn(async () => ({
			records: 1053,
			chars: 0,
			firstT: Date.now(),
			lastT: Date.now(),
			byChannel: {},
		})),
	};
	const wrapper = mount(DebugRecorderIndicator, {
		props: {
			actions,
		},
		attachTo: document.body,
	});
	const button = (text: string) => {
		const found = wrapper
			.findAll('button')
			.find((b) => b.text().startsWith(text));
		if (!found) throw new Error(`no button "${text}"`);
		return found;
	};
	return {
		actions,
		wrapper,
		button,
	};
}

describe('REC indicator', () => {
	afterEach(() => {
		localStorage.clear();
		document.body.innerHTML = '';
		// the chip sets the shared SDK i18n to the app's language
		i18n.global.locale.value = 'en';
	});

	it('opens on click with the event count and downloads from the menu', async () => {
		const { actions, wrapper, button } = setup();
		expect(wrapper.find('[role="dialog"]').exists()).toBe(false);

		await button('● REC').trigger('click');
		expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
		await vi.waitFor(() => expect(wrapper.text()).toContain('1,053 events'));

		await button('Download archive').trigger('click');
		expect(actions.download).toHaveBeenCalledOnce();
		wrapper.unmount();
	});

	it('asks before stopping, cancel keeps recording', async () => {
		const { actions, wrapper, button } = setup();
		await button('● REC').trigger('click');
		await button('Stop and delete data').trigger('click');
		expect(actions.stop).not.toHaveBeenCalled();

		await button('Cancel').trigger('click');
		expect(actions.stop).not.toHaveBeenCalled();

		await button('Stop and delete data').trigger('click');
		await button('Delete and stop').trigger('click');
		expect(actions.stop).toHaveBeenCalledOnce();
		wrapper.unmount();
	});

	it('closes on Escape', async () => {
		const { wrapper, button } = setup();
		await button('● REC').trigger('click');
		document.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: 'Escape',
			}),
		);
		await wrapper.vm.$nextTick();
		expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
		wrapper.unmount();
	});

	it('falls back to the browser language before the app stored one', async () => {
		vi.stubGlobal('navigator', {
			...navigator,
			languages: [
				'kk-KZ',
			],
		});
		const { wrapper, button } = setup();
		await button('● REC').trigger('click');
		expect(button('Мұрағатты жүктеп алу')).toBeTruthy();
		wrapper.unmount();
		vi.unstubAllGlobals();
	});

	it('speaks the app language from the SDK locales', async () => {
		localStorage.setItem('lang', 'uk');
		const { wrapper, button } = setup();
		await button('● REC').trigger('click');
		expect(button('Завантажити архів')).toBeTruthy();
		expect(button('Зупинити й видалити дані')).toBeTruthy();
		wrapper.unmount();
	});
});
