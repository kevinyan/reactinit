const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "output.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        alias: {
            "@super-fe": "path to local"
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "管理输出",
            template: "./template/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
