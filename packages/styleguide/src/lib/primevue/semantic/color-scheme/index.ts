import darkColor from './dark-color';
import lightColor from './light-color';
import palette from './palette';
import base from './base'
import overlay from './overlay'
import focusRing from './focus-ring'
import text from './text'
import formField from './form-field';
import surface from './surface';
import content from './content';
import list from './list';
import navigation from './navigation';
import table from './table';
import player from './player';

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
