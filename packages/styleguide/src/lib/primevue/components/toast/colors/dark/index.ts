const darkColors = {
	root: {
		blur: '10px',
	},
	info: {
		background: '{info.highlightColor}',
		borderColor: '{info.highlightColor}',
		color: '{info.onHighlightColor}',
		iconColor: '{info.onHighlightColor}',
		detailColor: '{info.onHighlightColor}',
		shadow: '0px 4px 8px 0px color-mix(in srgb, {info.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{info.onHighlightColor}',
			focusRing: {
				color: '{info.color}',
				shadow: 'none',
			},
		},
	},
	success: {
		background: '{success.highlightColor}',
		borderColor: '{success.highlightColor}',
		color: '{success.onHighlightColor}',
		iconColor: '{success.onHighlightColor}',
		detailColor: '{success.onHighlightColor}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {success.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{success.onHighlightColor}',
			focusRing: {
				color: '{success.color}',
				shadow: 'none',
			},
		},
	},
	warn: {
		background: '{warn.highlightColor}',
		borderColor: '{warn.highlightColor}',
		color: '{warn.onHighlightColor}',
		iconColor: '{warn.onHighlightColor}',
		detailColor: '{warn.onHighlightColor}',
		shadow: '0px 4px 8px 0px color-mix(in srgb, {warn.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{warn.onHighlightColor}',
			focusRing: {
				color: '{warn.color}',
				shadow: 'none',
			},
		},
	},
	error: {
		background: '{error.highlightColor}',
		borderColor: '{error.highlightColor}',
		color: '{error.onHighlightColor}',
		iconColor: '{error.onHighlightColor}',
		detailColor: '{error.onHighlightColor}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {error.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{error.onHighlightColor}',
			focusRing: {
				color: '{error.color}',
				shadow: 'none',
			},
		},
	},
	secondary: {
		background: '{secondary.highlightColor}',
		borderColor: '{secondary.highlightColor}',
		color: '{secondary.onHighlightColor}',
		iconColor: '{secondary.onHighlightColor}',
		detailColor: '{secondary.onHighlightColor}',
		shadow:
			'0px 4px 8px 0px color-mix(in srgb, {secondary.color}, transparent 96%)',
		closeButton: {
			hoverBackground: '{secondary.onHighlightColor}',
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
		iconColor: '{surface.950}',
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
