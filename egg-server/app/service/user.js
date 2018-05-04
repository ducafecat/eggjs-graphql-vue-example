const Service = require('egg').Service
const {createAPI} = require('../util/request')
const jwt = require('jsonwebtoken')

class UserService extends Service {

  // 用户详情
  async findById(id) {
    const result = await createAPI(this, '/user', 'get', {
      id
    })
    return result.data
  }

  // 用户列表
  async findAll() {
    const result = await createAPI(this, '/user/all', 'get', {})
    return result.data
  }

  // 用户登录、jwt token
  async findByUsernamePassword(username, password) {
    const result = await createAPI(this, '/user/login', 'post', {
      username,
      password
    })
    let user = result.data
    user.token = jwt.sign({uid: user.id}, this.config.jwt.jwtSecret, {
      expiresIn: this.config.jwt.jwtExpire
    })
    return user
  }

  // 用户删除
  async removeUser(id) {
    const result = await createAPI(this, '/user', 'delete', {
      id
    })
    return result.data
  }
}

module.exports = UserService
