import { mount, shallowMount } from '@vue/test-utils';

import WtHeaderActions from '../wt-header-actions.vue';

describe('WtHeaderActions', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtHeaderActions);
		expect(wrapper.classes('wt-header-actions')).toBe(true);
	});

	it('renders user data from name/account fields', () => {
		const user = {
			name: 'user nanme',
			account: 'acc@ou.nt',
		};
		const wrapper = shallowMount(WtHeaderActions, {
			props: {
				user,
			},
		});
		expect(wrapper.find('.wt-header-actions__name').text()).toBe(user.name);
		expect(wrapper.find('.wt-header-actions__account').text()).toBe(
			user.account,
		);
	});

	it('falls back to username/preferredUsername fields', () => {
		const user = {
			username: 'fallback-username',
			preferredUsername: 'fallback@account',
		};
		const wrapper = shallowMount(WtHeaderActions, {
			props: {
				user,
			},
		});
		expect(wrapper.find('.wt-header-actions__name').text()).toBe(user.username);
		expect(wrapper.find('.wt-header-actions__account').text()).toBe(
			user.preferredUsername,
		);
	});

	it('does not render header when user has no name or account', () => {
		const wrapper = shallowMount(WtHeaderActions);
		expect(wrapper.find('.wt-header-actions__header').exists()).toBe(false);
	});

	it('does not render footer when buildInfo is not passed', () => {
		const wrapper = shallowMount(WtHeaderActions);
		expect(wrapper.find('.wt-header-actions__footer').exists()).toBe(false);
	});

	it('renders build version in footer when buildInfo is passed', () => {
		const wrapper = shallowMount(WtHeaderActions, {
			props: {
				buildInfo: {
					release: '1.2.3',
					build: '456',
				},
			},
		});
		const footer = wrapper.find('.wt-header-actions__build__version');
		expect(footer.exists()).toBe(true);
		expect(footer.text()).toContain('1.2.3-456');
	});

	it('emits settings and closes the panel when settings is clicked', async () => {
		const wrapper = mount(WtHeaderActions);
		await wrapper.find('.wt-header-actions__btn').trigger('click');

		const settingsLink = wrapper.findAll('.wt-header-actions__action__link')[1];
		await settingsLink.trigger('click');
		expect(wrapper.emitted().settings).toBeTruthy();
		expect(
			wrapper.find('.wt-header-actions__panel-wrapper').attributes('style'),
		).toContain('display: none');
	});

	it('emits logout and closes the panel when logout is clicked', async () => {
		const wrapper = mount(WtHeaderActions);
		await wrapper.find('.wt-header-actions__btn').trigger('click');

		const logoutLink = wrapper.find(
			'.wt-header-actions__action--logout .wt-header-actions__action__link',
		);
		await logoutLink.trigger('click');
		expect(wrapper.emitted().logout).toBeTruthy();
		expect(
			wrapper.find('.wt-header-actions__panel-wrapper').attributes('style'),
		).toContain('display: none');
	});

	it('toggles panel visibility when the account button is clicked', async () => {
		const wrapper = mount(WtHeaderActions);
		expect(
			wrapper.find('.wt-header-actions__panel-wrapper').attributes('style'),
		).toContain('display: none');

		await wrapper.find('.wt-header-actions__btn').trigger('click');
		const style =
			wrapper.find('.wt-header-actions__panel-wrapper').attributes('style') ||
			'';
		expect(style).not.toContain('display: none');
	});
});
