import { WtTypography } from '@webitel/styleguide/enums';

/**
 * refers to the typography.css file
 */
export default {
	[WtTypography.Heading1]: {
		font: {
			size: '32px',
			weight: '600',
		},
		lineHeight: '48px',
		textTransform: 'none',
	},
	[WtTypography.Heading2]: {
		font: {
			size: '24px',
			weight: '600',
		},
		lineHeight: '40px',
		textTransform: 'none',
	},
	[WtTypography.Heading3]: {
		font: {
			size: '20px',
			weight: '600',
		},
		lineHeight: '32px',
		textTransform: 'none',
	},
	[WtTypography.Heading4]: {
		font: {
			size: '16px',
			weight: '600',
		},
		lineHeight: '24px',
		textTransform: 'none',
	},
	[WtTypography.Subtitle1]: {
		font: {
			size: '14px',
			weight: '500',
		},
		lineHeight: '24px',
		textTransform: 'none',
	},
	[WtTypography.Subtitle2]: {
		font: {
			size: '12px',
			weight: '500',
		},
		lineHeight: '20px',
		textTransform: 'none',
	},
	[WtTypography.Body1]: {
		font: {
			size: '14px',
			weight: '400',
		},
		lineHeight: '24px',
		textTransform: 'none',
	},
	[WtTypography.Body2]: {
		font: {
			size: '12px',
			weight: '400',
		},
		lineHeight: '16px',
		textTransform: 'none',
	},
	[WtTypography.Button]: {
		font: {
			size: '12px',
			weight: '500',
		},
		lineHeight: '24px',
		textTransform: 'uppercase',
	},
	[WtTypography.Caption]: {
		font: {
			size: '10px',
			weight: '400',
		},
		lineHeight: '16px',
		textTransform: 'none',
	},
	[WtTypography.Overline]: {
		font: {
			size: '12px',
			weight: '500',
		},
		lineHeight: '20px',
		textTransform: 'uppercase',
	},
};
