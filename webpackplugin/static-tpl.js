/**
 * @author: keelvin
 */

const pluginName = 'Static2tpl';
const log4js = require('log4js');
log4js.configure({
    appenders: {cheese: {type: 'file', filename: 'cheese.log'}},
    categories: {default: {appenders: ['cheese'], level: 'debug'}}
});

const logger = log4js.getLogger('cheese');

// 一个 JavaScript class
const StaticIntoTpl = class Staitc2tpl {
    constructor(options) {
        this.options = options;
    }
    // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
    apply(compiler) {
        // 指定要附加到的事件钩子函数
        compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
            // 替换处理逻辑
            let jsAsync = [];
            let jsSync = [];
            let cssAsync = [];
            let cssSync = [];

            for (let i in compilation.assets) {
                let filesplite = i.split('/');
                let filename = filesplite[filesplite.length - 1];

                // 匹配包含 async.**.js 的文件
                if (new RegExp(/async.*\.js/gi).test(i)) {
                    jsAsync.push(`/${filename}`);
                } else {
                }

                // 匹配包含 sync.xx.css的文件 , 其他CSS文件
                if (new RegExp(/\.css/gi).test(i)) {
                    if (new RegExp(/sync.*\.css/gi).test(i)) {
                        cssSync.push(compilation.assets[i].source());
                    } else {
                        cssAsync.push(`/${filename}`);
                    }
                }

                if (i.indexOf('tpl') > 0) {
                    // 挨个替换 ，注意：tpl在最后处理哦
                    let insertJSAsync = jsAsync.map(
                        ele => `<script src='${ele}'></script>`
                    );

                    let insertCSSAsync = cssAsync.map(
                        ele => `<link href='${ele}'/>`
                    );

                    let insertCSSSync = cssSync.map(
                        ele => `<style>${ele}</style>`
                    );

                    let content = compilation.assets[i].source();

                    if (content.indexOf('<js-async></js-async>' > 0)) {
                        content = content.replace(
                            '<js-async></js-async>',
                            insertJSAsync.join('')
                        );
                    }

                    if (content.indexOf('<css-async></css-async>' > 0)) {
                        content = content.replace(
                            '<css-async></css-async>',
                            insertCSSAsync.join('')
                        );
                    }

                    if (content.indexOf('<css-sync></css-sync>' > 0)) {
                        content = content.replace(
                            '<css-sync></css-sync>',
                            insertCSSSync.join('')
                        );
                    }

                    // logger.debug(content);
                    compilation.assets[i] = {
                        source() {
                            return content;
                        },
                        size() {
                            return content.length;
                        }
                    };
                }
            }

            callback();
        });
    }
};

module.exports = StaticIntoTpl;
