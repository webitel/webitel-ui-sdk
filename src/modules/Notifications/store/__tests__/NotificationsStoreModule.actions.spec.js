import audio from '../../assets/audio/new-message.wav';
import NotificationsStoreModule from '../NotificationsStoreModule';
import '../../../../../tests/mocks/broadcastChannelMock';

const notificationsModule = new NotificationsStoreModule().getModule();

const state = {
  thisTabId: null,
  broadcastChannel: new BroadcastChannel('WtAppNotifications'),
  unreadCount: 0,
  currentlyPlaying: false,
  wtIsPlaying: false,
};

describe('features/notifications store: actions', () => {
  const context = {
    dispatch: vi.fn(),
    commit: vi.fn(),
    getters: {
      IS_MAIN_TAB: () => true,
      IS_SOUND_ALLOWED: () => true,
    },
    rootGetters: {
      'workspace/TASK_ON_WORKSPACE': { channelId: 'id' },
    },
  };

  beforeEach(() => {
    context.state = { ...state };
    context.dispatch.mockClear();
    context.commit.mockClear();
  });

  it('INITIALIZE action dispatches _SETUP_THIS_TAB_ID action', () => {
    notificationsModule.actions.INITIALIZE(context);
    expect(context.dispatch.mock.calls[0][0]).toContain('_SETUP_THIS_TAB_ID');
  });

  it('INITIALIZE action dispatches _SETUP_UNREAD_COUND_BROADCAST_LISTENING action', () => {
    notificationsModule.actions.INITIALIZE(context);
    expect(context.dispatch.mock.calls[1][0]).toContain('_SETUP_UNREAD_COUND_BROADCAST_LISTENING');
  });

  it('INITIALIZE action dispatches _SETUP_THIS_TAB_ID action', () => {
    notificationsModule.actions.INITIALIZE(context);
    expect(context.dispatch).toHaveBeenCalledWith('_SETUP_THIS_TAB_ID');
  });

  it('DESTROY action dispatches STOP_SOUND action', () => {
    notificationsModule.actions.DESTROY(context);
    expect(context.dispatch).toHaveBeenCalledWith('STOP_SOUND');
  });

  it('DESTROY action dispatches _REMOVE_CURRENT_TAB_ID action', () => {
    notificationsModule.actions.DESTROY(context);
    expect(context.dispatch).toHaveBeenCalledWith('_REMOVE_CURRENT_TAB_ID');
  });

  it('INCREMENT_UNREAD_COUNT action dispatches _SET_UNREAD_COUNT and increases unreadCount', () => {
    notificationsModule.actions.INCREMENT_UNREAD_COUNT(context);
    expect(context.dispatch).toHaveBeenCalledWith('_SET_UNREAD_COUNT', context.state.unreadCount + 1);
  });

  it('_SETUP_UNREAD_COUND_BROADCAST_LISTENING action commits SET_BROADCAST_CHANNEL mutation', () => {
    notificationsModule.actions._SETUP_UNREAD_COUND_BROADCAST_LISTENING(context);
    expect(context.commit.mock.calls[0][0]).toContain('SET_BROADCAST_CHANNEL');
  });

  it('_SUBSCRIBE_TAB_CLOSING action commits SET_CURRENT_TAB_ID mutation', async () => {
    await notificationsModule.actions._SUBSCRIBE_TAB_CLOSING(context);
    window.dispatchEvent(new Event('storage'));
    expect(context.commit).toHaveBeenCalledWith('SET_CURRENT_TAB_ID', 'null');
  });

  it('PLAY_SOUND action commits SET_CURRENTLY_PLAIYNG mutation with sound', async () => {
    const sound = new Audio(audio);
    await notificationsModule.actions.PLAY_SOUND(context, { sound });
    expect(context.commit).toHaveBeenCalledWith('SET_CURRENTLY_PLAYING', sound);
  });

  it('_SET_UNREAD_COUNT dispatches _SET_TAB_TITLE action', () => {
    const unreadCount = 5;
    notificationsModule.actions._SET_UNREAD_COUNT(context, unreadCount);
    expect(context.dispatch).toHaveBeenCalledWith('_SET_TAB_TITLE');
  });

  it('_SETUP_THIS_TAB_ID commits SET_THIS_TAB_ID mutation', () => {
    notificationsModule.actions._SETUP_THIS_TAB_ID(context);
    expect(context.commit.mock.calls[0][0]).toBe('SET_THIS_TAB_ID');
  });

  it('_SETUP_THIS_TAB_ID commits SET_CURRENT_TAB_ID mutation', () => {
    notificationsModule.actions._SETUP_THIS_TAB_ID(context);
    expect(context.commit.mock.calls[1][0]).toBe('SET_CURRENT_TAB_ID');
  });

  it('_SET_UNREAD_COUNT action commits _SET_UNREAD_COUNT mutation with count', () => {
    const unreadCount = 5;
    notificationsModule.actions._SET_UNREAD_COUNT(context, unreadCount);
    expect(context.commit).toHaveBeenCalledWith('SET_UNREAD_COUNT', unreadCount);
  });

  it('_RESET_UNREAD_COUNT action does not dispatch if unread count is 0', () => {
    notificationsModule.actions._RESET_UNREAD_COUNT(context);
    expect(context.dispatch).not.toHaveBeenCalledWith('_SET_UNREAD_COUNT');
  });

  it('_RESET_UNREAD_COUNT action dispatches _SET_UNREAD_COUNT passing unread count equal to 0', () => {
    context.state.unreadCount = 1;
    notificationsModule.actions._RESET_UNREAD_COUNT(context);
    expect(context.dispatch).toHaveBeenCalledWith('_SET_UNREAD_COUNT', 0);
  });

  it('PLAY_SOUND action sets localStorage wtIsPlaying to true', () => {
    const sound = new Audio(audio);
    notificationsModule.actions.PLAY_SOUND(context, { sound });
    expect(localStorage.getItem('wtIsPlaying')).toBeTruthy();
  });

  it('STOP_SOUND action commits RESET_CURRENTLY_PLAYING mutation', () => {
    notificationsModule.actions.STOP_SOUND(context);
    expect(context.commit).toHaveBeenCalledWith('RESET_CURRENTLY_PLAYING');
  });

  it('STOP_SOUND action removes localStorage wtIsPlaying', () => {
    localStorage.setItem('wtIsPlaying', 'true');
    notificationsModule.actions.STOP_SOUND(context);
    expect(localStorage.getItem('wtIsPlaying')).toBeFalsy();
  });
});
