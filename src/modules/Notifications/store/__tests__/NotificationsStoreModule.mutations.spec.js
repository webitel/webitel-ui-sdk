import NotificationsStoreModule from '../NotificationsStoreModule.js';
import '../../../../../tests/mocks/broadcastChannelMock.js';

const notificationsModule = new NotificationsStoreModule().getModule();

const state = {
  thisTabId: null,
  broadcastChannel: new BroadcastChannel('WtAppNotifications'),
  unreadCount: 0,
  currentlyPlaying: false,
  wtIsPlaying: false,
};

describe('features/notifications store: mutations', () => {
  it('SET_THIS_TAB_ID sets thisTabId to state', () => {
    const thisTabId = 'thisTabId';
    notificationsModule.mutations.SET_THIS_TAB_ID(state, thisTabId);
    expect(state.thisTabId).toBe(thisTabId);
  });
  it('SET_CURRENT_TAB_ID sets currentTabId to state', () => {
    const currentTabId = 'currentTabId';
    notificationsModule.mutations.SET_CURRENT_TAB_ID(state, currentTabId);
    expect(state.currentTabId).toBe(currentTabId);
  });

  it('SET_BROADCAST_CHANNEL sets broadcastChannel to state', () => {
    const state = { broadcastChannel: null };
    const channel = new BroadcastChannel('test channel');
    notificationsModule.mutations.SET_BROADCAST_CHANNEL(state, channel);
    expect(state.broadcastChannel).toEqual(channel);
  });

  it('SET_CURRENTLY_PLAIYNG mutation sets currentlyPlaying to state', () => {
    const wtIsPlaying = true;
    notificationsModule.mutations.SET_CURRENTLY_PLAYING(state, wtIsPlaying);
    expect(state.currentlyPlaying).toBe(true);
  });

  it('RESET_CURRENTLY_PLAYING mutation sets currentlyPlaying to false in state', () => {
    notificationsModule.mutations.RESET_CURRENTLY_PLAYING(state);
    expect(state.currentlyPlaying).toBe(false);
  });

  it('_SET_UNREAD_COUNT mutation sets unreadCount to state', () => {
    const unreadCount = 15;
    notificationsModule.mutations.SET_UNREAD_COUNT(state, unreadCount);
    expect(state.unreadCount).toEqual(unreadCount);
  });
});
