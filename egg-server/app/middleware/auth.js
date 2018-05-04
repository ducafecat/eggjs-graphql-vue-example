const jwt = require('jsonwebtoken')

module.exports = options => {
  return async function auth(ctx, next) {
    // 开启 GraphiQL IDE 调试时，所有的请求放过
    if (ctx.app.config.graphql.graphiql) {
      await next()
      return
    }
    const body = ctx.request.body
    if (body.operationName !== 'UserLogin') {
      let token = ctx.request.header['authorization']
      if (token === undefined) {
        ctx.body = {message: '令牌为空，请登陆获取！'}
        ctx.status = 401
        return
      }
      token = token.replace(/^Bearer\s/, '')
      try {
        let decoded = jwt.verify(token, ctx.app.config.jwt.jwtSecret, {
          expiresIn: ctx.app.config.jwt.jwtExpire
        })
        await next()
      } catch (err) {
        ctx.body = {message: '访问令牌鉴权无效，请重新登陆获取！'}
        ctx.status = 401
      }
    } else {
      await next()
    }
  }
}
