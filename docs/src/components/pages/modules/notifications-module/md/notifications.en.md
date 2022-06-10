# Notifications

## General
Notifications module implements all functionality, related to system notifications:
- Browser notifications API
- Sound (ringing call, new chat message, etc)
- Counter in tab title
Notifying user about events happening in app.

This module supports sync between tabs.

**Important! Do not mismatch with ui-notifications, provided by
`wt-notification.vue` i `wt-notifications-bar.vue`.**

## Store Action Interface

Module provides user with following "public" actions:
 - `INITIALIZE: (context)`

Initializes module, subscriptions, broadcastChannel, etc. Should be dispatched
before using this module.

 - `DESTROY: (context)`

Destroys module and cleans up. Should be called before page unload
`window.addEventListener('beforeunload')` in order for module to work correctly. In worst
case, if many tabs are open, sound won't migrate from newer, to older one after the newer is closed.

 - `PLAY_SOUND: (context, { action, sound })`

Playing sound: an event could be new chat message, ringing call, етс. `Action`- main
paramether which currently supports:
    - `ChatActions.UserInvite`
    - `ChatActions.Message`
    - `ChatActions.Close`
    - `CallActions.Ringing`
with default sounds for each one.
You can handle edge cases by passing your custom sound as `sound` param.
`sound` could be file, or already `instanceof Audio`.

 - `STOP_SOUND: (context)`

Stop currently playing sound.

**Attention! Don't stops call!**


 - `SEND_NOTIFICATION: (
    context,
{
   locale,
   text = i18n.t(locale),
   icon = notificationIcon,
   interval = NOTIFICATION_VISIBLE_INTERVAL,
}
   )`

Sends [Desktop Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API).
interval - interval before notification disappears.

 - `INCREMENT_UNREAD_COUNT: (context)`
Increase tab title counter. Counter resets automatically at click on this tab.

