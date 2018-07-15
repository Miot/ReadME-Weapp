const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid, comment, openid, location, phone} = ctx.request.body
    try {
        await mysql('comments').insert({bookid, comment, openid, location, phone})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                mgs: '提交失败' + e.sqlMessage
            }
        }
    }
}

