const lightColors = {
	root: {
		blur: '1.5px',
	},
	info: {
		background: '{info.highlightColor}',
		borderColor: '{info.highlightColor}',
		color: '{info.onHighlightColor}',
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
