import { CallActions, ChatActions, JobState } from 'webitel-sdk';

import i18n from '../../../locale/i18n.js';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule.js';
import endChatSound from '../assets/audio/end-chat.wav';
import newChatSound from '../assets/audio/new-chat.wav';
import newMessageSound from '../assets/audio/new-message.wav';
import ringingSound from '../assets/audio/ringing.mp3';
import triggerSound from '../assets/audio/triggerSound.js';
import notificationIcon from '../assets/img/notification-icon.png';

const NOTIFICATION_VISIBLE_INTERVAL = 2000;

const getNotificationSound = (action) => {
  switch (action) {
    case ChatActions.UserInvite:
    case JobState.Distribute:
      return new Audio(newChatSound);
    case ChatActions.Message:
      return new Audio(newMessageSound);
    case ChatActions.Close:
      return new Audio(endChatSound);
    case CallActions.Ringing:
      // default call ringtone sound
      return new Audio(ringingSound);
    case CallActions.Hangup:
      return triggerSound();
    default:
      return false;
  }
};

const getCurrentTabId = () => localStorage.getItem('currentTabId');

const setCurrentTabId = (value) => localStorage.setItem('currentTabId', value);

export default class NotificationsStoreModule extends BaseStoreModule {
  state = {
    thisTabId: null, // this tab
    currentTabId: null, // current tab is localStorage
    broadcastChannel: null, // in order to reset the tab title with unread number
    unreadCount: 0,
    currentlyPlaying: false,
    isHangupSoundAllowed: false, // for prevent pause() of all sounds after end call
  };

  getters = {
    IS_MAIN_TAB: (state) => state.thisTabId === state.currentTabId,
    IS_SOUND_ALLOWED: (state, getters) =>
      getters.IS_MAIN_TAB && !state.currentlyPlaying,
  };

  actions = {
    // private
    _SUBSCRIBE_TAB_CLOSING: (context) => {
      window.addEventListener('storage', () => {
        if (!getCurrentTabId()) {
          setCurrentTabId(context.state.thisTabId);
        }
        context.commit('SET_CURRENT_TAB_ID', getCurrentTabId());
      });
    },

    _SETUP_THIS_TAB_ID: (context) => {
      const thisTabId = Math.random().toString();
      context.commit('SET_THIS_TAB_ID', thisTabId);
      setCurrentTabId(thisTabId);
      context.commit('SET_CURRENT_TAB_ID', thisTabId);
    },

    _SETUP_UNREAD_COUND_BROADCAST_LISTENING: (context) => {
      const broadcastChannel = new BroadcastChannel('WtAppNotifications');
      broadcastChannel.addEventListener('message', ({ data }) => {
        context.dispatch('_SET_UNREAD_COUNT', data.count);
      });

      document.documentElement.addEventListener('click', () => {
        context.dispatch('_RESET_UNREAD_COUNT');
      });
      context.commit('SET_BROADCAST_CHANNEL', broadcastChannel);
    },

    _SET_UNREAD_COUNT: (context, count) => {
      context.commit('SET_UNREAD_COUNT', count);
      context.dispatch('_SET_TAB_TITLE');
    },

    _RESET_UNREAD_COUNT: (context) => {
      if (context.state.unreadCount === 0) return;
      const count = 0;
      context.dispatch('_SET_UNREAD_COUNT', count);
      context.state.broadcastChannel.postMessage({ count });
    },

    _SET_TAB_TITLE: (context) => {
      const count = context.state.unreadCount;
      const titleText = document.title.replace(/\s*\(.*?\)\s*/g, '');
      document.title = count ? `(${count}) ${titleText}` : titleText;
    },

    _REMOVE_CURRENT_TAB_ID: () => {
      localStorage.removeItem('currentTabId');
    },

    // public
    INITIALIZE: (context) =>
      Promise.allSettled([
        context.dispatch('_SETUP_THIS_TAB_ID'),
        context.dispatch('_SETUP_UNREAD_COUND_BROADCAST_LISTENING'),
        context.dispatch('_SUBSCRIBE_TAB_CLOSING'),
      ]),

    DESTROY: (context) =>
      Promise.allSettled([
        context.dispatch('STOP_SOUND'),
        context.dispatch('_REMOVE_CURRENT_TAB_ID'),
      ]),

    PLAY_SOUND: async (
      context,
      { action, sound = getNotificationSound(action), volume = 1.0 },
    ) => {
      if (
        context.getters.IS_SOUND_ALLOWED &&
        !localStorage.getItem('wtIsPlaying')
      ) {
        const audio =
          sound instanceof Audio || sound.play ? sound : new Audio(sound);
        audio.volume = volume;

        audio.addEventListener(
          'ended',
          () => {
            context.dispatch('STOP_SOUND');
          },
          { once: true },
        );

        if (action === CallActions.Ringing) audio.loop = true;

        audio.play();
        localStorage.setItem('wtIsPlaying', 'true');
        context.commit('SET_CURRENTLY_PLAYING', audio);
      }
    },

    STOP_SOUND: (context) => {
      const { currentlyPlaying } = context.state;
      if (currentlyPlaying && currentlyPlaying instanceof Audio)
        currentlyPlaying.pause();
      localStorage.removeItem('wtIsPlaying');
      context.commit('RESET_CURRENTLY_PLAYING');
    },

    SEND_NOTIFICATION: (
      context,
      {
        locale,
        text = i18n.t(locale),
        icon = notificationIcon,
        interval = NOTIFICATION_VISIBLE_INTERVAL,
      },
    ) => {
      const notification = new Notification(text, { icon });

      notification.addEventListener(
        'click',
        () => {
          window.focus();
        },
        { once: true },
      );

      setTimeout(() => {
        notification.close();
      }, interval);
    },

    INCREMENT_UNREAD_COUNT: (context) => {
      const count = context.state.unreadCount + 1;
      context.dispatch('_SET_UNREAD_COUNT', count);
      context.state.broadcastChannel.postMessage({ count });
    },
  };

  mutations = {
    SET_THIS_TAB_ID: (state, thisTabId) => {
      state.thisTabId = thisTabId;
    },

    SET_CURRENT_TAB_ID: (state, currentTabId) => {
      state.currentTabId = currentTabId;
    },

    SET_BROADCAST_CHANNEL: (state, channel) => {
      state.broadcastChannel = channel;
    },
    SET_CURRENTLY_PLAYING: (state, sound) => {
      state.currentlyPlaying = sound;
    },
    RESET_CURRENTLY_PLAYING: (state) => {
      state.currentlyPlaying = false;
    },
    SET_UNREAD_COUNT: (state, count) => {
      state.unreadCount = count;
    },
    SET_HANGUP_STATE: (state, value) => {
      state.isHangupSoundAllowed = value;
    },
  };
}
