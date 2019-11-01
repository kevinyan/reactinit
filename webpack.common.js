const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("./webpackplugin/css-inline-plugin")
    .default;
const IfPlugin = require("if-webpack-plugin");
const PROJECT = require("./project.config");

const UploadPlugin = require("deploy-files/webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = env => {
    return {
        entry: "./src/index.js",
        output: {
            filename: "[name].[hash:8].js",
            path: path.resolve(__dirname, "dist")
        },
        resolve: {
            alias: {
                react: "preact-compat",
                "react-dom": "preact-compat"
            },
            modules: [
                path.resolve(__dirname, "../react-components/"),
                "node_modules"
            ]
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
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
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
            // new CleanWebpackPlugin({
            // }),
            new HtmlWebpackPlugin({
                inject: false,
                cache: false,
                title: "管理输出",
                template: "./template/index/index.tpl",
                filename: `${__dirname}/dist/template/index/index.tpl`
            }),
            new HtmlWebpackPlugin({
                inject: false,
                cache: false,
                template: "./template/layout.tpl",
                filename: `${__dirname}/dist/template/layout.tpl`
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[hash:8].css",
                ignoreOrder: false
            }),
            new HTMLInlineCSSWebpackPlugin({
                exclude: ["main"]
            }),
            new OptimizeCssAssetsPlugin(),

            new IfPlugin(
                process.env.NODE_ENV === "fsr",
                new UploadPlugin(PROJECT.reciverConf)
            ),
            new WriteFilePlugin({
                test: /\.tpl$/,
                useHashIndex: true
            })
        ]
    };
};
