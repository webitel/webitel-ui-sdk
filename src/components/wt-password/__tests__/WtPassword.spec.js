import { mount, shallowMount } from '@vue/test-utils';

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
		const findCopy = (wrapper) =>
			wrapper.findComponent({
				name: 'WtCopyAction',
			});
		const getIcons = (wrapper) =>
			wrapper
				.findAllComponents({
					name: 'wt-icon-btn',
				})
				.map((btn) => btn.attributes('icon'));
		const findIconBtn = (wrapper, icon) =>
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

		it('renders actions in the passed order', () => {
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
				'eye--opened',
				'generate',
				'copy',
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

		it('emits click:generate and unmasks the field on generate click', async () => {
			const wrapper = mount(WtPassword, {
				props: {
					actions: [
						PasswordAction.Generate,
					],
				},
			});
			await findIconBtn(wrapper, 'generate').trigger('click');

			expect(wrapper.emitted('click:generate')).toHaveLength(1);
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
		const getInputValue = (wrapper) =>
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
			const getHint = (wrapper) =>
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
