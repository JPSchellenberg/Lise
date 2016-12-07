var webpack = require('webpack');

module.exports = {
  entry: ['./server/index.ts'],
  output: {
    path: __dirname + 'dist/server',
    publicPath: '',
    filename: "index.js",
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.ts?$/,
        loader: "ts-loader"
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      }
    ],
  },
  target: 'node',
  externals: {
    'fs': 'fs',
    'socket.io-client/package': 'socket.io-client/package'
  },
  plugins: [
    new webpack.DefinePlugin({
  'process.env':{
    'NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
    'VERSION': JSON.stringify( process.env.VERSION )
  }
}),
  ]
};