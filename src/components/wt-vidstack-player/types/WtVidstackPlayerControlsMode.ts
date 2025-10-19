export const WtVidstakPlayerControlsMode = {
  STREAM: 'stream',
  media: 'media',
} as const;

export type WtVidstakPlayerControlsMode =
  (typeof WtVidstakPlayerControlsMode)[keyof typeof WtVidstakPlayerControlsMode];
