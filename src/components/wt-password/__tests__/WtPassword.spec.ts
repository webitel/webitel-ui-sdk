import {
	flushPromises,
	mount,
	shallowMount,
	type VueWrapper,
} from '@vue/test-utils';

import { PasswordAction } from '../../../enums';
import WtPassword from '../wt-password.vue';

describe('WtPassword', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtPassword);
		expect(wrapper.classes()).toContain('wt-password');
	});

	// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807]
	it('renders "Password" label by default', () => {
		const wrapper = mount(WtPassword);
		expect(wrapper.find('.wt-label').text()).toBe('Password');
	});

	it('renders the label text when passed', () => {
		const wrapper = mount(WtPassword, {
			props: {
				label: 'Password',
			},
		});
		expect(wrapper.find('.wt-label').text()).toBe('Password');
	});

	it('renders a mask toggle button by default', () => {
		const wrapper = mount(WtPassword);
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.exists(),
		).toBe(true);
	});

	// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807] the mask toggle is an action now
	it('does not render a mask toggle button when it is not in actions', () => {
		const wrapper = mount(WtPassword, {
			props: {
				actions: [],
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.exists(),
		).toBe(false);
	});

	it('toggles the input type and icon when the mask toggle is clicked', async () => {
		const wrapper = mount(WtPassword);
		const toggleBtn = wrapper.findComponent({
			name: 'wt-icon-btn',
		});
		expect(toggleBtn.attributes('icon')).toBe('eye--opened');
		expect(
			wrapper
				.findComponent({
					name: 'Password',
				})
				.props('inputProps'),
		).toEqual({
			type: 'password',
		});

		await toggleBtn.trigger('click');

		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.attributes('icon'),
		).toBe('eye--closed');
		expect(
			wrapper
				.findComponent({
					name: 'Password',
				})
				.props('inputProps'),
		).toEqual({
			type: 'text',
		});
	});

	// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807]
	describe('actions', () => {
		const findCopy = (wrapper: VueWrapper) =>
			wrapper.findComponent({
				name: 'WtCopyAction',
			});
		const getIcons = (wrapper: VueWrapper) =>
			wrapper
				.findAllComponents({
					name: 'wt-icon-btn',
				})
				.map((btn) => btn.attributes('icon'));
		const findIconBtn = (wrapper: VueWrapper, icon: string) =>
			wrapper
				.findAllComponents({
					name: 'wt-icon-btn',
				})
				.find((btn) => btn.attributes('icon') === icon);

		const allActions = [
			PasswordAction.Copy,
			PasswordAction.Generate,
			PasswordAction.Toggle,
		];

		it('renders only the mask toggle by default', () => {
			const wrapper = mount(WtPassword, {
				props: {
					modelValue: 'secret',
				},
			});
			expect(findCopy(wrapper).exists()).toBe(false);
			expect(getIcons(wrapper)).toEqual([
				'eye--opened',
			]);
		});

		it('renders copy only when the field has a value', async () => {
			const wrapper = mount(WtPassword, {
				props: {
					actions: [
						PasswordAction.Copy,
					],
					modelValue: '',
				},
			});
			expect(findCopy(wrapper).exists()).toBe(false);

			await wrapper.setProps({
				modelValue: 'secret',
			});
			expect(findCopy(wrapper).exists()).toBe(true);
			expect(findCopy(wrapper).props('value')).toBe('secret');
		});

		// [Claude] actions are fixed in the template, the passed order doesn't matter
		it('renders actions in a fixed order', () => {
			const wrapper = mount(WtPassword, {
				props: {
					actions: [
						PasswordAction.Toggle,
						PasswordAction.Generate,
						PasswordAction.Copy,
					],
					modelValue: 'secret',
				},
			});
			const icons = wrapper
				.findAll('.p-inputgroupaddon > *')
				.map((el) => el.attributes('icon'));
			expect(icons).toEqual([
				'copy',
				'generate',
				'eye--opened',
			]);
		});

		it('emits click:copy on copy click', async () => {
			const wrapper = mount(WtPassword, {
				props: {
					actions: [
						PasswordAction.Copy,
					],
					modelValue: 'secret',
				},
			});
			expect(findCopy(wrapper).attributes('icon')).toBe('copy');
			await findCopy(wrapper).trigger('click');
			expect(wrapper.emitted('click:copy')).toHaveLength(1);
		});

		// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807] the component generates the value itself
		describe('generate', () => {
			const getInputType = (wrapper: VueWrapper) =>
				wrapper
					.findComponent({
						name: 'Password',
					})
					.props('inputProps');
			const clickGenerate = (wrapper: VueWrapper) =>
				findIconBtn(wrapper, 'generate')?.trigger('click');

			it('sets a password from the default generator and unmasks the field', async () => {
				const wrapper = mount(WtPassword, {
					props: {
						actions: allActions,
					},
				});
				await clickGenerate(wrapper);
				await flushPromises();

				const [[value]] = wrapper.emitted('update:modelValue') as [
					string,
				][];
				expect(value).toHaveLength(12);
				expect(getInputType(wrapper)).toEqual({
					type: 'text',
				});
			});

			it('sets a password from a sync generator', async () => {
				const wrapper = mount(WtPassword, {
					props: {
						actions: [
							PasswordAction.Generate,
						],
						generator: () => 'Sync1!',
					},
				});
				await clickGenerate(wrapper);
				await flushPromises();

				expect(wrapper.emitted('update:modelValue')).toEqual([
					[
						'Sync1!',
					],
				]);
			});

			it('disables generate while an async generator is pending', async () => {
				let resolve: (value: string) => void = () => {};
				const generator = vi.fn(
					() =>
						new Promise<string>((res) => {
							resolve = res;
						}),
				);
				const wrapper = mount(WtPassword, {
					props: {
						actions: [
							PasswordAction.Generate,
						],
						generator,
					},
				});
				await clickGenerate(wrapper);
				expect(findIconBtn(wrapper, 'generate')?.props('disabled')).toBe(true);
				expect(wrapper.emitted('update:modelValue')).toBeUndefined();

				resolve('Async1!');
				await flushPromises();

				expect(generator).toHaveBeenCalledTimes(1);
				expect(wrapper.emitted('update:modelValue')).toEqual([
					[
						'Async1!',
					],
				]);
				expect(findIconBtn(wrapper, 'generate')?.props('disabled')).toBe(false);
			});

			it('keeps the value and masking when the generator fails', async () => {
				const wrapper = mount(WtPassword, {
					props: {
						actions: [
							PasswordAction.Generate,
							PasswordAction.Toggle,
						],
						modelValue: 'typed',
						generator: () => Promise.reject(new Error('fail')),
					},
				});
				await clickGenerate(wrapper);
				await flushPromises();

				expect(wrapper.emitted('update:modelValue')).toBeUndefined();
				expect(getInputType(wrapper)).toEqual({
					type: 'password',
				});
				expect(findIconBtn(wrapper, 'generate')?.props('disabled')).toBe(false);
			});
		});

		it('emits click:toggle and switches show/hide on toggle click', async () => {
			const wrapper = mount(WtPassword);
			await findIconBtn(wrapper, 'eye--opened').trigger('click');

			expect(wrapper.emitted('click:toggle')).toHaveLength(1);
			expect(getIcons(wrapper)).toEqual([
				'eye--closed',
			]);
		});

		it('shows the value unmasked when there is no toggle action', () => {
			const wrapper = mount(WtPassword, {
				props: {
					actions: [
						PasswordAction.Copy,
					],
				},
			});
			expect(
				wrapper
					.findComponent({
						name: 'Password',
					})
					.props('inputProps'),
			).toEqual({
				type: 'text',
			});
		});

		it('disables all actions when the field is disabled', () => {
			const wrapper = mount(WtPassword, {
				props: {
					actions: allActions,
					disabled: true,
					modelValue: 'secret',
				},
			});
			const iconBtns = wrapper.findAllComponents({
				name: 'wt-icon-btn',
			});
			expect(iconBtns).toHaveLength(3);
			expect(iconBtns.every((btn) => btn.props('disabled'))).toBe(true);
		});
	});

	// [Claude] [https://webitel.atlassian.net/browse/WTEL-10807]
	describe('hideHash', () => {
		const hash = 'x'.repeat(60);
		const getInputValue = (wrapper: VueWrapper) =>
			wrapper
				.findComponent({
					name: 'Password',
				})
				.props('modelValue');

		it('shows a hash when hideHash is off', () => {
			const wrapper = mount(WtPassword, {
				props: {
					modelValue: hash,
				},
			});
			expect(getInputValue(wrapper)).toBe(hash);
		});

		it('does not show or copy a hash', () => {
			const wrapper = mount(WtPassword, {
				props: {
					hideHash: true,
					modelValue: hash,
					actions: [
						PasswordAction.Copy,
					],
				},
			});
			expect(getInputValue(wrapper)).toBe('');
			expect(
				wrapper
					.findComponent({
						name: 'WtCopyAction',
					})
					.exists(),
			).toBe(false);
		});

		it('adds the hash hint to the label, a passed hint wins', async () => {
			const getHint = (wrapper: VueWrapper) =>
				wrapper
					.findComponent({
						name: 'wt-label',
					})
					.props('hint');
			const wrapper = mount(WtPassword, {
				props: {
					hideHash: true,
				},
			});
			expect(getHint(wrapper)).toContain(
				'Enter value only if you want to edit it',
			);

			await wrapper.setProps({
				labelProps: {
					hint: 'Custom',
				},
			});
			expect(getHint(wrapper)).toBe('Custom');

			await wrapper.setProps({
				hideHash: false,
				labelProps: {},
			});
			expect(getHint(wrapper)).toBeUndefined();
		});

		it('shows a plain password and passes typed text to the model', async () => {
			const wrapper = mount(WtPassword, {
				props: {
					hideHash: true,
					modelValue: 'secret',
				},
			});
			expect(getInputValue(wrapper)).toBe('secret');

			await wrapper
				.findComponent({
					name: 'Password',
				})
				.vm.$emit('update:modelValue', 'typed');
			expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([
				'typed',
			]);
		});
	});

	it('passes disabled down to the underlying password input', () => {
		const wrapper = mount(WtPassword, {
			props: {
				disabled: true,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'Password',
				})
				.props('disabled'),
		).toBe(true);
	});
});
