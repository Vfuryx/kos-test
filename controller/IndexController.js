let fn_index = async(ctx, next) => {
    ctx.render('index.html',{name:ctx.cookies.get('user')})

    // ctx.response.body = 555
}



module.exports = {
    "GET /":fn_index,
    
}