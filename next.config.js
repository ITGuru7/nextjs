const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ANALYZE } = process.env;
const resolve = require("path").resolve;

module.exports = {
  webpack: config => {
    if (process.env.NODE_ENV === "production") {
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
    }

    config.node = {
      fs: "empty"
    };

    config.module.rules.push(
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000
          }
        }
      }
    );

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
    config.module.noParse = [
      resolve("./node_modules/mapbox-gl/dist/mapbox-gl.js")
    ];

    config.resolve.alias = {
      "mapbox-gl$": resolve("./node_modules/mapbox-gl/dist/mapbox-gl.js")
    };
    return config;
  }
};
