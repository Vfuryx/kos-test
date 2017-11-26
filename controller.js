const fs = require('fs');

/**
 * 遍历route
 * @param router 传入路由实例
 * @param mapping 要遍历的数组
 */
function addMapping(router, mapping) {
    for (let url in mapping) {
        //url 'GET /' 'POST /'...
        // log(mapping[url], url)
        if (url.startsWith('GET')) {
            router.get(url.substring(4), mapping[url])
        } else if ('POST') {
            router.post(url.substring(5), mapping[url])
        } else {
            log('err')
        }
    }
}

/**
 * 控制自动生产路由
 * @param path 确定路由文件地址
 * @param router 传入路由对象
 */
function addControllers(router, path) {



    var fileRoutes = getFile(path)
    for (let f of fileRoutes) {
        let mapping = require(path + f)
        addMapping(router, mapping)
    }
}

/**
 * 提取JS文件
 * @param path 文件源地址
 * @returns {Array.<T>|*} ['xxx.js','xxxx.js']
 */
function getFile(path) {
    console.log(path)
    var routerFile = fs.readdirSync(path)
    var fileRoutes = routerFile.filter((f) => {
        return f.endsWith('.js')
    })
    return fileRoutes
}


module.exports = (dir) => {
    var path =  dir || './routes/',
        router = require('koa-router')()
    addControllers(router, path)
    return router.routes()
}


