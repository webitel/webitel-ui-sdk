const darkColors = {
	root: {
		blur: '10px',
	},
	info: {
		background: '{info.highlightColor}',
		borderColor: '{info.highlightColor}',
		color: '{info.color}',
		detailColor: '{info.color}',
		shadow: '0px 4px 8px 0px color-mix(in srgb, {info.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{info.color}',
			focusRing: {
				color: '{info.color}',
				shadow: 'none',
			},
		},
	},
	success: {
		background: '{success.highlightColor}',
		borderColor: '{success.highlightColor}',
		color: '{success.color}',
		detailColor: '{success.color}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {success.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{success.color}',
			focusRing: {
				color: '{success.color}',
				shadow: 'none',
			},
		},
	},
	warn: {
		background: '{warn.highlightColor}',
		borderColor: '{warn.highlightColor}',
		color: '{warn.color}',
		detailColor: '{warn.color}',
		shadow: '0px 4px 8px 0px color-mix(in srgb, {warn.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{warn.color}',
			focusRing: {
				color: '{warn.color}',
				shadow: 'none',
			},
		},
	},
	error: {
		background: '{error.highlightColor}',
		borderColor: '{error.highlightColor}',
		color: '{error.color}',
		detailColor: '{error.color}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {error.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{error.color}',
			focusRing: {
				color: '{error.color}',
				shadow: 'none',
			},
		},
	},
	secondary: {
		background: '{secondary.highlightColor}',
		borderColor: '{secondary.highlightColor}',
		color: '{secondary.foreground}',
		detailColor: '{secondary.foreground}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {secondary.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{secondary.foreground}',
			focusRing: {
				color: '{secondary.color}',
				shadow: 'none',
			},
		},
	},
	contrast: {
		background: '{surface.0}',
		borderColor: '{surface.100}',
		color: '{surface.950}',
		detailColor: '{surface.700}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)',
		closeButton: {
			hoverBackground: '{surface.100}',
			focusRing: {
				color: '{surface.950}',
				shadow: 'none',
			},
		},
	},
};

export default darkColors;
