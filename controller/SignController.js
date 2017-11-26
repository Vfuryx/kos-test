/**
 * 登录页
 * @param {*} ctx 
 * @param {*} next 
 */
let sign_in_get = async(ctx, next) => {
    ctx.render('login.html')
}

/**
 * 登陆表单
 * @param {*} ctx 
 * @param {*} next 
 */
let sign_in_post = async(ctx, next) => {
    let user = ctx.request.body.user,
        passwd = ctx.request.body.passwd;

    // ctx.body = user
    if (/^[0-9a-zA-Z\_]{5,15}$/.test(user) &&
        /[\s\w]{6,15}/.test(passwd) &&
        user == 'furyx' && passwd == '123456'
    ) {
        ctx.cookies.set('user','furyx')
        ctx.response.redirect('/')

    } else {

        ctx.body = '错误'

    }
}


/**
 * 登出
 * @param {*} ctx 
 * @param {*} next 
 */
let sign_out = async(ctx, next) => {

    ctx.cookies.set('user',undefined)
    ctx.response.status = 200
    ctx.response.redirect('/')
}


module.exports = {
    'GET /login': sign_in_get,
    'POST /login': sign_in_post,
    'POST /logout': sign_out
}