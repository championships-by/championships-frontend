const {
  override,
  addWebpackAlias,
  addWebpackModuleRule,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  }),
  addWebpackModuleRule({
    test: /\.s[ac]ss$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          sassOptions: {
            includePaths: [path.resolve(__dirname, "src")],
          },
        },
      },
    ],
  })
);
