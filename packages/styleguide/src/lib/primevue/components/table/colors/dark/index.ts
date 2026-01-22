const darkColors = {
  root: {
    borderColor: '{content.borderColor}'
  },
  header: {
    background: '{content.background}',
    borderColor: '{datatable.border.borderColor}',
    color: '{content.color}',
  },
  headerCell: {
    background: '{surface.850}',
    hoverBackground: '{surface.900}',
    selectedBackground: '{surface.950}',
    dragBackground: '{surface.750}',
    borderColor: '{datatable.border.color}',
    color: '{content.color}',
    hoverColor: '{content.hoverColor}',
    selectedColor: '{content.color}',
    focusRing: {
      color: '{focus.ring.color}',
      shadow: '{focus.ring.shadow}'
    }
  },
  row: {
    stripedBackground: '{surface.950}',
    background: '{content.background}',
    hoverBackground: '{content.hoverBackground}',
    successBackground: '{green.950}',
    successHoverBackground: '{green.900}',
    warningBackground: '{orange.950}',
    warningHoverBackground: '{orange.900}',
    errorBackground: '{red.950}',
    errorHoverBackground: '{red.900}',
    selectedBackground: '{highlight.background}',
    color: '{content.color}',
    hoverColor: '{content.hoverColor}',
    selectedColor: '{highlight.color}',
    focusRing: {
      color: '{focus.ring.color}',
      shadow: '{focus.ring.shadow}'
    }
  },
  bodyCell: {
    borderColor: '{surface.700}',
    selectedBorderColor: '{primary.900}'
  },
  footerCell: {
    background: '{content.background}',
    borderColor: '{datatable.border.color}',
    color: '{content.color}',
  },
  footer: {
    background: '{content.background}',
    borderColor: '{datatable.border.color}',
    color: '{content.color}',
  },
  resizeIndicator: {
    color: '{primary.color}'
  },
  reorderIndicator: {
    color: '{surface.750}'
  },
  filter: {
    overlaySelect: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}'
    },
    overlayPopover: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        color: '{overlay.popover.color}',
        shadow: '{overlay.popover.shadow}',
    },
    rule: {
        borderColor: '{content.border.color}'
    },
    constraint: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        separator: {
            borderColor: '{content.border.color}'
        },
    }
  },
  sortIcon: {
    color: '{text.muted.color}',
    hoverColor: '{text.hover.muted.color}',
  },
  frozenColumn: {
    background: '{content.background}',
  },
  columnResizer: {
    background: '{surface.800}'
  },
}

export default darkColors