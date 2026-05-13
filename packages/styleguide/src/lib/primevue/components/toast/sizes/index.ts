const sizes = {
	root: {
		width: '25rem',
		borderRadius: '{content.border.radius}',
		borderWidth: '1px',
		transitionDuration: '{transition.duration}',
	},
	icon: {
		size: '1.125rem',
	},
	content: {
		padding: '{overlay.popover.padding}',
		gap: '0.5rem',
	},
	text: {
		gap: '0.5rem',
	},
	summary: {
		fontWeight: '500',
		fontSize: '1rem',
	},
	detail: {
		fontWeight: '500',
		fontSize: '0.875rem',
	},
	closeButton: {
		width: '1.75rem',
		height: '1.75rem',
		borderRadius: '50%',
		focusRing: {
			width: '{focus.ring.width}',
			style: '{focus.ring.style}',
			offset: '{focus.ring.offset}',
		},
	},
	closeIcon: {
		size: '1rem',
	},
};

export default sizes;
