export const VideoCallAction = {
  Screenshot: 'screenshot',
  Recordings: 'recordings',
  Mic: 'mic',
  Video: 'video',
  Settings: 'settings',
  Chat: 'chat',
  Hangup: 'hangup',
  ZoomScreenshot: 'zoom-screenshot',
  CloseScreenshot: 'close-screenshot',
} as const;

export type VideoCallAction =
  (typeof VideoCallAction)[keyof typeof VideoCallAction];
