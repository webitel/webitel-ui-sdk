import base from './base';
import content from './content';
import darkColor from './dark-color';
import focusRing from './focus-ring';
import formField from './form-field';
import lightColor from './light-color';
import list from './list';
import navigation from './navigation';
import overlay from './overlay';
import palette from './palette';
import player from './player';
import surface from './surface';
import table from './table';
import text from './text';

const colorScheme = {
	light: {
		...palette,
		...lightColor,
		...base.light,
		...focusRing.colorScheme.light,
		...overlay.colorScheme.light,
		...text.colorScheme.light,
		...formField.colorScheme.light,
		...surface.colorScheme.light,
		...content.colorScheme.light,
		...list.colorScheme.light,
		...navigation.colorScheme.light,
		...table.colorScheme.light,
		...player.colorScheme.light,
	},
	dark: {
		...palette,
		...darkColor,
		...base.dark,
		...focusRing.colorScheme.dark,
		...overlay.colorScheme.dark,
		...text.colorScheme.dark,
		...formField.colorScheme.dark,
		...surface.colorScheme.dark,
		...content.colorScheme.dark,
		...list.colorScheme.dark,
		...navigation.colorScheme.dark,
		...table.colorScheme.dark,
		...player.colorScheme.dark,
	},
};

export default colorScheme;
