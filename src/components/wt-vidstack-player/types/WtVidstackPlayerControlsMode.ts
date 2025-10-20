export const WtVidstakPlayerControlsMode = {
  STREAM: 'stream',
  MEDIA: 'media',
} as const;

export type WtVidstakPlayerControlsMode =
  (typeof WtVidstakPlayerControlsMode)[keyof typeof WtVidstakPlayerControlsMode];
