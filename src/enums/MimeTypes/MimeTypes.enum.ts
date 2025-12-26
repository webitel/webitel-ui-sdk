export const MimeTypes = {
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  IMAGE_GIF: 'image/gif',
  IMAGE_SVG_XML: 'image/svg+xml',
  IMAGE_WEBP: 'image/webp',

  VIDEO_MP4: 'video/mp4',
  VIDEO_WEBM: 'video/webm',
  VIDEO_MPEG: 'video/mpeg',

  AUDIO_MPEG: 'audio/mpeg',
  AUDIO_WAV: 'audio/wav',

  APPLICATION_PDF: 'application/pdf',
  APPLICATION_MSWORD: 'application/msword',
  APPLICATION_DOCX:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
} as const;

export type MimeTypes = (typeof MimeTypes)[keyof typeof MimeTypes];
