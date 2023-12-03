// webpack.config.js
module.exports = {
    resolve: {
      fallback: {
        "fs": false,
        "path": false,
        "zlib": require.resolve("browserify-zlib"),
        "net": false,
        "dns": false,
        "child_process": false,
        "tls": false
      }
    }
  };
  