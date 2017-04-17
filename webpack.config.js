module.exports = {
  entry: './entry.jsx',
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],    //Specifies file types to transpile
        exclude: /(node_modules)/,    //Leaves dependencies alone
        loader: 'babel-loader',    //Sets Babel as the transpired
        query: {
          presets: ['es2015', 'react']  //Tells Babel what syntaxes to translate
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
