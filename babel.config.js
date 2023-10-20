module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    'babel-preset-vite',
  ],
  overrides: [
    {
      include: ['styleguide/components/*.jsx'],
      presets: ['@babel/preset-react'],
    },
  ],
};
