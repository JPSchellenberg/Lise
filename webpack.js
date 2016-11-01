var webpack = require('webpack');

console.log( process.env.NODE_ENV );

module.exports = {
  entry: process.env.NODE_ENV === 'development' ? [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.ts',
    './src/stylesheets/main.scss'
  ] : ['./src/index.ts', './src/stylesheets/main.scss'],
  output: {
    path: __dirname + '/app',
    publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : '',
    filename: "app.js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", "svg", "ttf", "eot", "woff2"]
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: "react-hot!ts-loader"
      },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
    ],

    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "serialport": "serialport"
    // "react": "React",
    // "react-dom": "ReactDOM"
  },
  devServer: {
    contentBase: './app',
    hot: true,
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      '/socket.io': {
        target: process.env.ARDUINO ? 'http://arduino.local:3000' : 'http://localhost:3000',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
  'process.env':{
    'NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
    'VERSION': JSON.stringify( process.env.VERSION )
  }
}),
  ]
};