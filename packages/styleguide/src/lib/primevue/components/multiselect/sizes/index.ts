const sizes = {
	root: {
		paddingX: '{form.field.padding.x}',
		paddingY: '{form.field.padding.y}',
		borderRadius: '{form.field.border.radius}',
		focusRing: {
			width: '{form.field.focus.ring.width}',
			style: '{form.field.focus.ring.style}',
			offset: '{form.field.focus.ring.offset}',
		},
		transitionDuration: '{form.field.transition.duration}',
		sm: {
			fontSize: '{form.field.sm.font.size}',
			paddingX: '{form.field.sm.padding.x}',
			paddingY: '{form.field.sm.padding.y}',
		},
		lg: {
			fontSize: '{form.field.lg.font.size}',
			paddingX: '{form.field.lg.padding.x}',
			paddingY: '{form.field.lg.padding.y}',
		},
	},
	dropdown: {
		width: '2.5rem',
	},
	overlay: {
		borderRadius: '{overlay.select.border.radius}',
	},
	list: {
		padding: '{list.padding}',
		gap: '{list.gap}',
		header: {
			padding: '{list.header.padding}',
		},
	},
	option: {
		padding: '{list.option.padding}',
		borderRadius: '{list.option.border.radius}',
		gap: '0.5rem',
	},
	optionGroup: {
		fontWeight: '{list.option.group.font.weight}',
		padding: '{list.option.group.padding}',
	},
	chip: {
		borderRadius: '{border.radius.sm}',
	},
	emptyMessage: {
		padding: '{list.option.padding}',
	},
};

export default sizes;
