const sizes = {
  root: {
    borderRadius: '{content.border.radius}',
    borderWidth: '1px',
    transitionDuration: '{transition.duration}'
  },
  content: {
    padding: '0.5rem 0.75rem',
    gap: '0.5rem',
    sm: {
      padding: '0.375rem 0.625rem'
    },
    lg: {
      padding: '0.625rem 0.875rem'
    }
  },
  text: {
    fontSize: '1rem',
    fontWeight: '500',
    sm: {
      fontSize: '0.75rem'
    },
    lg: {
      fontSize: '1.125rem'
    }
  },
  icon: {
    size: '1.5rem',
    sm: {
      size: '1rem'
    },
    lg: {
      size: '2rem'
    }
  },
  closeButton: {
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '50%',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      offset: '{focus.ring.offset}'
    }
  },
  closeIcon: {
    size: '1rem',
    sm: {
      size: '0.875rem'
    },
    lg: {
      size: '1.125rem'
    }
  },
  outlined: {
    root: {
      borderWidth: '1px'
    }
  },
  simple: {
    content: {
      padding: '0.25rem 0.5rem',
    }
  }
};

export default sizes;
