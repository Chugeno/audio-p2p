module.exports = {
    // Configuración de Webpack
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    // Resolución de módulos
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
    },
    // Fallback para módulos de Node.js
    resolve: {
      fallback: {
        util: require.resolve("util/"),
      },
    },
  };
