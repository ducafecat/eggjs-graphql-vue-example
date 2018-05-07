'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525226470831_4271'

  // add your config here
  config.middleware = ['auth', 'graphql']

  // csrf
  config.security = {
    csrf: {
      ignore: () => true
    }
  }

  // easy-mock 模拟数据地址
  config.baseURL =
    'https://www.easy-mock.com/mock/59801fd8a1d30433d84f198c/example'

  // jwt
  config.jwt = {
    jwtSecret: 'shared-secret',
    jwtExpire: '14 days',
    WhiteList: ['UserLogin']
  }

  // graphql
  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: false
    // graphQL 路由前的拦截器
    // onPreGraphQL: function(ctx) {
    //   console.log(ctx)
    //   ctx.body = '请求要求身份验证'
    //   ctx.status = 401
    // },
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    // onPreGraphiQL: function(ctx) {
    //   // console.log(ctx)
    // }
  }

  // cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  // bodyParser
  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb'
  }

  return config
}
