import focusRing from './focus-ring';
import formField from './form-field';
import list from './list';
import navigation from './navigation';
import overlay from './overlay';
import player from './player';
import typography from './typography';

export default {
	transitionDuration: '0.2s',
	disabledOpacity: '0.6',
	iconSize: '1rem',
	anchorGutter: '2px',
	content: {
		borderRadius: '{border.radius.md}',
	},
	mask: {
		transitionDuration: '0.15s',
	},
	formField,
	list,
	navigation,
	overlay,
	focusRing,
	player,
	typography,
};
