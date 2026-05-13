const lightColors = {
	root: {
		blur: '1.5px',
	},
	info: {
		background: '{info.highlightColor}',
		borderColor: '{info.color}',
		color: '{info.color}',
		detailColor: '{text.muted.color}',
		shadow: '0px 4px 8px 0px color-mix(in srgb, {info.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{info.foreground}',
			focusRing: {
				color: '{info.color}',
				shadow: 'none',
			},
		},
	},
	success: {
		background: '{success.highlightColor}',
		borderColor: '{success.color}',
		color: '{success.color}',
		detailColor: '{text.muted.color}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {success.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{success.foreground}',
			focusRing: {
				color: '{success.color}',
				shadow: 'none',
			},
		},
	},
	warn: {
		background: '{warn.highlightColor}',
		borderColor: '{warn.color}',
		color: '{warn.color}',
		detailColor: '{text.muted.color}',
		shadow: '0px 4px 8px 0px color-mix(in srgb, {warn.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{warn.foreground}',
			focusRing: {
				color: '{warn.color}',
				shadow: 'none',
			},
		},
	},
	error: {
		background: '{error.highlightColor}',
		borderColor: '{error.color}',
		color: '{error.color}',
		detailColor: '{text.muted.color}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {error.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{error.foreground}',
			focusRing: {
				color: '{error.color}',
				shadow: 'none',
			},
		},
	},
	secondary: {
		background: '{secondary.highlightColor}',
		borderColor: '{secondary.color}',
		color: '{secondary.foreground}',
		detailColor: '{text.muted.color}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {secondary.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{secondary.color}',
			focusRing: {
				color: '{secondary.color}',
				shadow: 'none',
			},
		},
	},
	contrast: {
		background: '{surface.850}',
		borderColor: '{surface.950}',
		color: '{surface.50}',
		detailColor: '{surface.100}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)',
		closeButton: {
			hoverBackground: '{surface.800}',
			focusRing: {
				color: '{surface.50}',
				shadow: 'none',
			},
		},
	},
};

export default lightColors;
