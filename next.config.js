const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ANALYZE } = process.env;
const webpack = require("webpack");

module.exports = {
  webpack: config => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: "networkFirst",
            urlPattern: /^https?.*/
          }
        ]
      })
    );
    config.node = {
      fs: "empty"
    };
    config.module.rules.push({
      test: /\.css$/,
      loader: ["style-loader", "css-loader"]
    });
    if (config.resolve.alias) {
      delete config.resolve.alias.react;
      delete config.resolve.alias["react-dom"];
    }
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: 8888,
          openAnalyzer: true
        })
      );
    }

    return config;
  }
};
