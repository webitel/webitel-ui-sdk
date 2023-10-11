module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  overrides: [
    {
      include: ['styleguide/components/*.jsx'],
      presets: ['@babel/preset-react'],
    },
  ],
};
