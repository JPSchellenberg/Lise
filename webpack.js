var webpack = require('webpack');

module.exports = {
  entry: process.env.NODE_ENV === 'development' ? [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/index.ts',
    './client/stylesheets/main.scss'
  ] : ['./client/index.ts', './client/stylesheets/main.scss'],
  output: {
    path: __dirname + process.env.NODE_ENV === 'development' ? 'build/client' : 'dist/client',
    publicPath: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : '',
    filename: "app.js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: process.env.NODE_ENV === 'development' ? "source-map" : null,

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

    preLoaders: process.env.NODE_ENV === 'development' ? [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
       {
        test: /\.js$/,
        loader: "source-map-loader"
      } 
    ] : []
  },
  devServer: {
    contentBase: './build/client',
    hot: true,
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        secure: false
      },
      '/api/v0/*': {
        target: 'http://localhost:3000',
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