let fn_index = async(ctx, next) => {
    ctx.render('index.html', {
        name: '123'
    })

}



module.exports = {
    "GET /": fn_index
}