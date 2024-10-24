import IconAction from '../../enums/IconAction/IconAction.enum.js';

const IActionData = Object.freeze({
  [IconAction.ADD]: {
    value: IconAction.ADD,
    icon: 'plus',
    hint: 'webitelUI.iconAction.addActionHint',
  },
  [IconAction.DELETE]: {
    value: IconAction.DELETE,
    icon: 'bucket',
    hint: 'webitelUI.iconAction.deleteActionHint',
  },
  [IconAction.DOWNLOAD]: {
    value: IconAction.DOWNLOAD,
    icon: 'download',
    hint: 'webitelUI.iconAction.downloadActionHint',
  },
  [IconAction.EDIT]: {
    value: IconAction.EDIT,
    icon: 'edit',
    hint: 'webitelUI.iconAction.editActionHint',
  },
  [IconAction.HISTORY]: {
    value: IconAction.HISTORY,
    icon: 'history',
    hint: 'webitelUI.iconAction.historyActionHint',
  },
  [IconAction.REFRESH]: {
    value: IconAction.REFRESH,
    icon: 'refresh',
    hint: 'reusable.refresh',
  },
});

export { IActionData };
