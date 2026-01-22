const lightColors = {
  info: {
    background: '{info.highlightColor}',
    borderColor: '{info.color}',
    color: '{info.color}',
    shadow: '0px 4px 8px 0px color-mix(in srgb, {info.color}, transparent 96%)',
    closeButton: {
      hoverBackground: '{info.foreground}',
      focusRing: {
        color: '{info.color}',
        shadow: 'none'
      }
    },
    outlined: {
      color: '{info.color}',
      borderColor: '{info.color}',
      closeButton: {
        hoverBackground: '{info.foreground}',
      }
    },
    simple: {
      color: '{info.color}'
    }
  },
  success: {
    background: '{success.highlightColor}',
    borderColor: '{success.color}',
    color: '{success.color}',
    shadow: '0px 4px 8px 0px color-mix(in srgb, {success.color}, transparent 96%)',
    closeButton: {
      hoverBackground: '{success.foreground}',
      focusRing: {
        color: '{success.color}',
        shadow: 'none'
      }
    },
    outlined: {
      color: '{success.color}',
      borderColor: '{success.color}',
      closeButton: {
        hoverBackground: '{success.foreground}',
      }
    },
    simple: {
      color: '{success.color}'
    }
  },
  warn: {
    background: '{warn.highlightColor}',
    borderColor: '{warn.color}',
    color: '{warn.color}',
    shadow: '0px 4px 8px 0px color-mix(in srgb, {warn.color}, transparent 96%)',
    closeButton: {
      hoverBackground: '{warn.foreground}',
      focusRing: {
        color: '{warn.color}',
        shadow: 'none'
      }
    },
    outlined: {
      color: '{warn.color}',
      borderColor: '{warn.color}',
      closeButton: {
        hoverBackground: '{warn.foreground}',
      }
    },
    simple: {
      color: '{warn.color}'
    }
  },
  error: {
    background: '{error.highlightColor}',
    borderColor: '{error.color}',
    color: '{error.color}',
    shadow: '0px 4px 8px 0px color-mix(in srgb, {error.color}, transparent 96%)',
    closeButton: {
      hoverBackground: '{error.foreground}',
      focusRing: {
        color: '{error.color}',
        shadow: 'none'
      }
    },
    outlined: {
      color: '{error.color}',
      borderColor: '{error.color}',
      closeButton: {
        hoverBackground: '{error.foreground}',
      }
    },
    simple: {
      color: '{error.color}'
    }
  },
  secondary: {
    background: '{secondary.highlightColor}',
    borderColor: '{secondary.color}',
    color: '{secondary.foreground}',
    shadow: '0px 4px 8px 0px color-mix(in srgb, {secondary.color}, transparent 96%)',
    closeButton: {
      hoverBackground: '{secondary.color}',
      focusRing: {
        color: '{secondary.color}',
        shadow: 'none'
      }
    },
    outlined: {
      color: '{secondary.foreground}',
      borderColor: '{secondary.color}',
      closeButton: {
        hoverBackground: '{secondary.highlightColor}',
      }
    },
    simple: {
      color: '{secondary.foreground}'
    }
  },
  contrast: {
    background: '{surface.850}',
    borderColor: '{surface.950}',
    color: '{surface.50}',
    shadow: '0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)',
    closeButton: {
      hoverBackground: '{surface.800}',
      focusRing: {
        color: '{surface.50}',
        shadow: 'none'
      }
    },
    outlined: {
      color: '{surface.950}',
      borderColor: '{surface.950}',
      closeButton: {
        hoverBackground: '{surface.50}',
      }
    },
    simple: {
      color: '{surface.950}'
    }
  }
};

export default lightColors;
