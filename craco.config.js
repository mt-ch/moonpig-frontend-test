// CRA's built-in PostCSS setup only knows Tailwind v3, so hand PostCSS
// over to postcss.config.js where the Tailwind v4 plugin is registered.
// This replaces CRA's default PostCSS chain, so autoprefixer is re-added there.
module.exports = {
  style: {
    postcss: {
      mode: 'file',
    },
  },
  jest: {
    configure: {
      // CRA ships Jest 27, which ignores package "exports", so point it at react-router's CJS build
      moduleNameMapper: {
        '^react-router/dom$': '<rootDir>/node_modules/react-router/dist/development/dom-export.js',
      },
    },
  },
};
