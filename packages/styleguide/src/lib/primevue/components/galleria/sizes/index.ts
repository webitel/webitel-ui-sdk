const sizes = {
  root: {
    borderWidth: '1px',
    borderRadius: '{border.radius.lg}',
    transitionDuration: '{transition.duration}'
  },
  mask: {
    zIndex: '11'
  },
  activeImageContainer: {
    width: '70vw',
    height: 'calc(70vw / 16 * 9)',    // 16:9 aspect ratio
  },
  fullscreenImage: {
    maxHeight: '85vh',
    maxWidth: '100vw'
  },
  navButton: {
    size: '2.5rem',
    gutter: '1rem',
    prev: {
      borderRadius: '50%'
    },
    next: {
      borderRadius: '50%'
    },
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      offset: '{focus.ring.offset}',
    }
  },
  navIcon: {
    size: '1.5rem'
  },
  thumbnailsContent: {
    padding: '1rem 1rem'
  },
  thumbnailImage: {
    width: '5rem',
    height: '3.125rem',
  },
  thumbnailNavButton: {
    size: '2.5rem',
    borderRadius: '50%',
    gutter: '0.5rem',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      offset: '{focus.ring.offset}',
    }
  },
  thumbnailNavButtonIcon: {
    size: '1rem'
  },
  caption: {
    padding: '1rem'
  },
  indicatorList: {
    gap: '0.5rem',
    padding: '1rem'
  },
  indicatorButton: {
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      offset: '{focus.ring.offset}',
    }
  },
  closeButton: {
    size: '3rem',
    gutter: '0.5rem',
    borderRadius: '50%',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      offset: '{focus.ring.offset}',
    }
  },
  closeButtonIcon: {
    size: '1.5rem'
  },
  footer: {
    padding: '0.5rem',
  },
}

export default sizes
