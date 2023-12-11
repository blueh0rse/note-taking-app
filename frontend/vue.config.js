require("@vue/cli-service");
const Dotenv = require("dotenv-webpack");

module.exports = {
  outputDir: "../public",
  configureWebpack: {
    plugins: [new Dotenv()],
  },
};
