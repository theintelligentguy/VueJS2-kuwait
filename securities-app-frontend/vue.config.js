module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules\/(?!axios)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread']
              }
            }
          }
        ]
      }
    }
  };
  