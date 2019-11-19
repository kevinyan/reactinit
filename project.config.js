/**
 * @file project config
 * @author keelvin
 *
 */
const path = require('path');
const outputDir = 'dist';

module.exports = {
    reciverConf: {
        receiver: 'http://xxx.com:8527/',
        templatePath: '/home/work/orp',
        staticPath: '/home/work/orp/nginx.static/htdocs'
    },
    middlewares: [
        () => {
            return require('apim-tools').express({
                logLevel: 'warn',
                // express server 使用的端口号
                port: 8889,
                // 设置存储的 mock 相关数据存储的根目录
                root: __dirname + '/public',
                // 项目 schema token 具体到 apim 平台查看
                schemaToken: 'xxxx',
                // 是否启动时候立刻自动同步
                startAutoSync: true
            });
        }
    ]
};
