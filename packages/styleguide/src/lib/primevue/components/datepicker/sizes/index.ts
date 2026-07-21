const sizes = {
	root: {
		transitionDuration: '{transition.duration}',
	},
	panel: {
		borderRadius: '{content.border.radius}',
		shadow: '{overlay.popover.shadow}',
		padding: '{overlay.popover.padding}',
	},
	header: {
		padding: '0 0 0.5rem 0',
	},
	title: {
		gap: '0.5rem',
		fontWeight: '500',
	},
	dropdown: {
		width: '2.5rem',
		sm: {
			width: '2rem',
		},
		lg: {
			width: '3rem',
		},
		borderRadius: '{form.field.border.radius}',
		focusRing: {
			width: '{focus.ring.width}',
			style: '{focus.ring.style}',
			color: '{focus.ring.color}',
			offset: '{focus.ring.offset}',
			shadow: '{focus.ring.shadow}',
		},
	},
	selectMonth: {
		padding: '0.25rem 0.5rem',
		borderRadius: '{content.border.radius}',
	},
	selectYear: {
		padding: '0.25rem 0.5rem',
		borderRadius: '{content.border.radius}',
	},
	group: {
		gap: '{overlay.popover.padding}',
	},
	dayView: {
		margin: '0.5rem 0 0 0',
	},
	weekDay: {
		padding: '0.25rem',
		fontWeight: '500',
	},
	date: {
		width: '1.5rem',
		height: '1.5rem',
		borderRadius: '50%',
		padding: '0.125rem',
		focusRing: {
			width: '{focus.ring.width}',
			style: '{focus.ring.style}',
			color: '{focus.ring.color}',
			offset: '{focus.ring.offset}',
			shadow: '{focus.ring.shadow}',
		},
	},
	monthView: {
		margin: '0.5rem 0 0 0',
	},
	month: {
		padding: '0.375rem',
		borderRadius: '{content.border.radius}',
	},
	yearView: {
		margin: '0.5rem 0 0 0',
	},
	year: {
		padding: '0.375rem',
		borderRadius: '{content.border.radius}',
	},
	buttonbar: {
		padding: '0.5rem 0 0 0',
	},
	timePicker: {
		padding: '0.5rem 0 0 0',
		gap: '0.5rem',
		buttonGap: '0',
	},
};

export default sizes;
