import { shallowMount } from '@vue/test-utils';
import WtNotificationsBar from '../wt-notifications-bar.vue';
import WtNotification from '../../../molecules/wt-notification/wt-notification.vue';
import eventBus from '../../../../scripts/eventBus';

describe('WtNotificationsBar', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtNotificationsBar, {
      mocks: { $eventBus: eventBus },
    });
    expect(wrapper.classes('wt-notifications-bar')).toBe(true);
  });

  it('shows notification at event bus event', async () => {
    const wrapper = shallowMount(WtNotificationsBar, {
      mocks: { $eventBus: eventBus },
    });
    wrapper.vm.$eventBus.$emit('notification', {
      type: 'error', text: 'error',
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(WtNotification).length).toBe(1);
  });

  it('closes notification manually', async () => {
    const wrapper = shallowMount(WtNotificationsBar, {
      mocks: { $eventBus: eventBus },
    });
    wrapper.vm.$eventBus.$emit('notification', {
      type: 'error', text: 'error',
    });
    await wrapper.vm.$nextTick();
    wrapper.findComponent(WtNotification).vm.$emit('close');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(WtNotification).length).toBe(0);
  });

  it('closes notification automatically', async () => {
    const wrapper = shallowMount(WtNotificationsBar, {
      mocks: { $eventBus: eventBus },
      data: () => ({ notificationDuration: 100 }),
    });
    wrapper.vm.$eventBus.$emit('notification', {
      type: 'error', text: 'error',
    });
    setTimeout(() => {
      expect(wrapper.findAllComponents(WtNotification).length).toBe(0);
    }, 101);
  });
});
