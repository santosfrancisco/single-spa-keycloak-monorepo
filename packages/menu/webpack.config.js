const { merge } = require("webpack-merge");
const path = require("path");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "francisco",
    projectName: "menu",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              projectReferences: true,
              transpileOnly: true,
            },
          },
        },
      ],
    },
    externals: ["styled-components", "@francisco/auth"],
  });
};
