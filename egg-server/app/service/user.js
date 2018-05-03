const Service = require('egg').Service
const {createAPI} = require('../util/request')
const jwt = require('jsonwebtoken')

class UserService extends Service {
  async findById(uid) {
    const result = await createAPI(this, '/user', 'post', {
      uid
    })
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
}

module.exports = UserService
