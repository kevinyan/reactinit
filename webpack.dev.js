const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const PROJECT = require("./project.config");

module.exports = merge(common(), {
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
        before: function(app, server) {
            // allow other plugins to register middlewares, e.g. PWA
            (PROJECT.middlewares || []).forEach(fn => {
                app.use(fn());
            });
        }
    }
});
