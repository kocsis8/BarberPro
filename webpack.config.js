// webpack.config.js
module.exports = {
  resolve: {
    fallback: {
      querystring: require.resolve('querystring-es3'),
      path: require.resolve('path-browserify'),
      zlib: require.resolve('browserify-zlib'),
      process: require.resolve('process/browser'),
    },
  }  
  };
  