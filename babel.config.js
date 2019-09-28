// babel.config.js
module.exports = api => {
  // only configure babel for jest stuff
  if (api.env('test')) {
    return {
      plugins: [
        ["@babel/plugin-transform-modules-commonjs", {
          "allowTopLevelThis": true
        }],
        "@babel/plugin-proposal-object-rest-spread"
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: "10"
            }
          }
        ]
      ]
    }
  }

  // by default, this library does not do babel transforms
  return {};
};
