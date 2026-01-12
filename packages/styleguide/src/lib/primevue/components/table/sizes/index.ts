const sizes = {
  root: {
    transitionDuration: '{transition.duration}'
  },
  header: {
    borderWidth: '0 0 1px 0',
    padding: '0.5rem',
    sm: {
      padding: '0.375rem 0.5rem'
    },
    lg: {
      padding: '1rem 1.25rem'
    }
  },
  headerCell: {
    gap: '0.5rem',
    padding: '0.5rem',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      offset: '-1px',
    },
    sm: {
      padding: '0.375rem 0.5rem'
    },
    lg: {
      padding: '1rem 1.25rem'
    }
  },
  columnWeight: {
    fontWeight: '600'
  },
  row: {
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      offset: '-1px',
    }
  },
  bodyCell: {
    padding: '0.5rem',
    sm: {
      padding: '0.375rem 0.5rem'
    },
    lg: {
      padding: '1rem 1.25rem'
    }
  },
  footerCell: {
    padding: '0.5rem',
    sm: {
      padding: '0.375rem 0.5rem'
    },
    lg: {
      padding: '1rem 1.25rem'
    }
  },
  columnFooter: {
    fontWeight: '600'
  },
  footer: {
    borderWidth: '0 0 1px 0',
    padding: '0.5rem',
    sm: {
      padding: '0.375rem 0.5rem'
    },
    lg: {
      padding: '1rem 1.25rem'
    }
  },
  columnResizer: {
    width: '1px'
  },
  resizeIndicator: {
    width: '1px',
  },
  filter: {
    inlineGap: '0.5rem',
    overlaySelect: {
        borderRadius: '{overlay.select.border.radius}',
    },
    overlayPopover: {
        padding: '{overlay.popover.padding}',
        gap: '0.5rem'
    },
    constraintList: {
        padding: '{list.padding}',
        gap: '{list.gap}'
    },
    constraint: {
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}'
    }
  },
  sortIcon: {
    size: '0.875rem'
  }
}

export default sizes