const log = console.log.bind(console)
const isProduction = process.env.NODE_ENV === 'production';
const Koa = require('koa')
const template = require('./templating')
const controller = require('./controller')
const koaBodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(koaBodyParser());

if (!isProduction) {
    //静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的，Node程序不需要处理静态文件
    const static = require('./static')
    app.use(static('/static/', __dirname + '/static'))
}

app.use(template('views', {
    noCache: false,
    watch: !isProduction
}))

/**
 * 验证登陆的中间件
 */
app.use(async(ctx, next) => {
 
    if (ctx.cookies.get('user') && ctx.path == '/login') {
        ctx.state.user = ctx.cookies.get('user')
        ctx.response.redirect('/')
    } else if (ctx.cookies.get('user')) {
        ctx.state.user = ctx.cookies.get('user')
    }
   
    await next()

})

app.use(controller(__dirname + '/controller/'))



app.listen('3000', () => {
    log('127.0.0.1:3000')
})