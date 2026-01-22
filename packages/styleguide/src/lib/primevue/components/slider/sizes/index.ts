const sizes = {
  root: {
    transitionDuration: '{transition.duration}'
  },
  track: {
    borderRadius: '{content.border.radius}',
    size: '4px'
  },
  handle: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    content: {
      borderRadius: '50%',
      width: '12px',
      height: '12px',
    },
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      offset: '{focus.ring.offset}',
    }
  }
}

export default sizes