export const WtTypography = {
    Button: 'typo-button',
    Body1: 'typo-body-1',
    Body2: 'typo-body-2',
    Subtitle1: 'typo-subtitle-1',
    Subtitle2: 'typo-subtitle-2',
    Heading1: 'typo-heading-1',
    Heading2: 'typo-heading-2',
    Heading3: 'typo-heading-3',
    Heading4: 'typo-heading-4',
    Caption: 'typo-caption',
    Overline: 'typo-overline',
} as const;

export type WtTypography = (typeof WtTypography)[keyof typeof WtTypography];
