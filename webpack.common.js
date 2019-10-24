const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        alias: {
            react: "preact-compat",
            "react-dom": "preact-compat",
            "@super-fe": "/Users/baidu/kevingithub/react-components/@super-fe"
        }
    },
    optimization: {
        splitChunks: {
            minSize: 40000,
            cacheGroups: {
                commons: {
                    test: /style\.less$/,
                    name: "synccss",
                    chunks: "all",
                    enforce: true,
                    priority: 20
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(c|le|sa)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    // "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "管理输出",
            template: "./template/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css",
            ignoreOrder: false
        }),
        new OptimizeCssAssetsPlugin()
    ]
};
