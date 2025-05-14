const palette = {
  // LIGHTNESS
  lightness: {
    lighten: {
      1: '60%',
      2: '70%',
      3: '80%',
      4: '90%',
      5: '95%',
    },

    darken: {
      1: '50%',
      2: '45%',
      3: '40%',
      4: '35%',
    },

    accent: {
      1: '75%',
      2: '65%',
      3: '50%',
      4: '40%',
    },

    gray: {
      light: {
        1: '54%',
        2: '64%',
        3: '74%',
        4: '84%',
        5: '94%',
      },

      darken: {
        1: '44%',
        2: '34%',
        3: '24%',
        4: '14%',
        5: '4%',
      },
    },
  },

  // SATURATION
  saturation: {
    lighten: {
      1: '90%',
      2: '90%',
      3: '90%',
      4: '88%',
      5: '92%',
    },

    darken: {
      1: '75%',
      2: '75%',
      3: '75%',
      4: '75%',
    },

    accent: {
      1: '91%',
      2: '90%',
      3: '97%',
      4: '97%',
    },

    grey: '20%',
  },

  // HUE
  hue: {
    red: 0,
    pink: 337,
    purple: 291,
    'deep-purple': 263,
    indigo: 232,
    blue: 209,
    'light-blue': 202,
    cyan: 188,
    teal: 173,
    green: 121,
    'light-green': 88,
    lime: 66,
    yellow: 54,
    amber: 43,
    orange: 32,
    'deep-orange': 11,
    grey: 225,
  },

  // RED
  red: {
    lighten: {
      1: 'hsla({hue.red},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.red},90%,{lightness.lighten.2},1)',
      3: 'hsla({hue.red},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.red},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.red},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.red},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.red},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.red},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.red},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.red},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.red},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.red},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.red},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // PINK
  pink: {
    lighten: {
      1: 'hsla({hue.pink},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.pink},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.pink},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.pink},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.pink},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.pink},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.pink},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.pink},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.pink},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.pink},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.pink},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.pink},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.pink},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // PURPLE
  purple: {
    lighten: {
      1: 'hsla({hue.purple},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.purple},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.purple},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.purple},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.purple},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.purple},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.purple},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.purple},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.purple},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.purple},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.purple},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.purple},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.purple},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // DEEP PURPLE
  'deep-purple': {
    lighten: {
      1: 'hsla({hue.deep-purple},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.deep-purple},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.deep-purple},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.deep-purple},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.deep-purple},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.deep-purple},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.deep-purple},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.deep-purple},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.deep-purple},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.deep-purple},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.deep-purple},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.deep-purple},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.deep-purple},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // INDIGO
  indigo: {
    lighten: {
      1: 'hsla({hue.indigo},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.indigo},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.indigo},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.indigo},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.indigo},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.indigo},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.indigo},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.indigo},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.indigo},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.indigo},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.indigo},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.indigo},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.indigo},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // BLUE
  blue: {
    lighten: {
      1: 'hsla({hue.blue},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.blue},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.blue},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.blue},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.blue},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.blue},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.blue},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.blue},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.blue},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.blue},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.blue},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.blue},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.blue},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // BLUE
  'light-blue': {
    lighten: {
      1: 'hsla({hue.light-blue},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.light-blue},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.light-blue},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.light-blue},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.light-blue},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.light-blue},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.light-blue},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.light-blue},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.light-blue},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.light-blue},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.light-blue},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.light-blue},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.light-blue},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // CYAN
  cyan: {
    lighten: {
      1: 'hsla({hue.cyan},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.cyan},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.cyan},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.cyan},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.cyan},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.cyan},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.cyan},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.cyan},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.cyan},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.cyan},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.cyan},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.cyan},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.cyan},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // TEAL
  teal: {
    lighten: {
      1: 'hsla({hue.teal},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.teal},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.teal},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.teal},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.teal},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.teal},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.teal},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.teal},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.teal},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.teal},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.teal},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.teal},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.teal},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // GREEN
  green: {
    lighten: {
      1: 'hsla({hue.green},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.green},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.green},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.green},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.green},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.green},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.green},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.green},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.green},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.green},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.green},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.green},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.green},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // LIGHT GREEN
  'light-green': {
    lighten: {
      1: 'hsla({hue.light-green},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.light-green},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.light-green},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.light-green},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.light-green},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.light-green},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.light-green},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.light-green},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.light-green},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.light-green},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.light-green},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.light-green},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.light-green},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // LIME
  lime: {
    lighten: {
      1: 'hsla({hue.lime},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.lime},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.lime},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.lime},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.lime},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.lime},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.lime},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.lime},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.lime},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.lime},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.lime},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.lime},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.lime},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // YELLOW
  yellow: {
    lighten: {
      1: 'hsla({hue.yellow},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.yellow},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.yellow},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.yellow},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.yellow},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.yellow},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.yellow},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.yellow},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.yellow},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.yellow},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.yellow},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.yellow},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.yellow},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // AMBER
  amber: {
    lighten: {
      1: 'hsla({hue.amber},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.amber},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.amber},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.amber},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.amber},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.amber},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.amber},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.amber},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.amber},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.amber},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.amber},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.amber},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.amber},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // ORANGE
  orange: {
    lighten: {
      1: 'hsla({hue.orange},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.orange},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.orange},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.orange},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.orange},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.orange},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.orange},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.orange},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.orange},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.orange},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.orange},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.orange},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.orange},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // DEEP ORANGE
  'deep-orange': {
    lighten: {
      1: 'hsla({hue.deep-orange},{saturation.lighten.1},{lightness.lighten.1},1)',
      2: 'hsla({hue.deep-orange},{saturation.lighten.2},{lightness.lighten.2},1)',
      3: 'hsla({hue.deep-orange},{saturation.lighten.3},{lightness.lighten.3},1)',
      4: 'hsla({hue.deep-orange},{saturation.lighten.4},{lightness.lighten.4},1)',
      5: 'hsla({hue.deep-orange},{saturation.lighten.5},{lightness.lighten.5},1)',
    },

    darken: {
      1: 'hsla({hue.deep-orange},{saturation.darken.1},{lightness.darken.1},1)',
      2: 'hsla({hue.deep-orange},{saturation.darken.2},{lightness.darken.2},1)',
      3: 'hsla({hue.deep-orange},{saturation.darken.3},{lightness.darken.3},1)',
      4: 'hsla({hue.deep-orange},{saturation.darken.4},{lightness.darken.4},1)',
    },

    accent: {
      1: 'hsla({hue.deep-orange},{saturation.accent.1},{lightness.accent.1},1)',
      2: 'hsla({hue.deep-orange},{saturation.accent.2},{lightness.accent.2},1)',
      3: 'hsla({hue.deep-orange},{saturation.accent.3},{lightness.accent.3},1)',
      4: 'hsla({hue.deep-orange},{saturation.accent.4},{lightness.accent.4},1)',
    },
  },

  // GREY
  grey: {
    lighten: {
      1: 'hsla({hue.grey},{saturation.grey},{lightness.gray.light.1},1)',
      2: 'hsla({hue.grey},{saturation.grey},{lightness.gray.light.2},1)',
      3: 'hsla({hue.grey},{saturation.grey},{lightness.gray.light.3},1)',
      4: 'hsla({hue.grey},{saturation.grey},{lightness.gray.light.4},1)',
      5: 'hsla({hue.grey},{saturation.grey},{lightness.gray.light.5},1)',
    },

    darken: {
      1: 'hsla({hue.grey},{saturation.grey},{lightness.gray.darken.1},1)',
      2: 'hsla({hue.grey},{saturation.grey},{lightness.gray.darken.2},1)',
      3: 'hsla({hue.grey},{saturation.grey},{lightness.gray.darken.3},1)',
      4: 'hsla({hue.grey},{saturation.grey},{lightness.gray.darken.4},1)',
      5: 'hsla({hue.grey},{saturation.grey},{lightness.gray.darken.5},1)',
    },
  },

  black: 'hsla(0,0%,0%,1)',
  white: 'hsla(0,0%,100%,1)',
};

export default palette;
