module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    stylesheets: {joinTo: 'app.css'}
  },

  paths: {
    public: './docs',
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  }
};
