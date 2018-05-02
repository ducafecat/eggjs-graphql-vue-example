module.exports = options => {
  return async function auth(ctx, next) {
    // console.log('middleware => atuh')
    // console.log('X-Token', ctx.request.header['X-Token'])
    await next();
    // ctx.body = {message:'请求要求身份验证'}
    // ctx.status = 401
  }
}
