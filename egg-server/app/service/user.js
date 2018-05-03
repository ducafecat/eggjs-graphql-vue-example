const Service = require('egg').Service

class UserService extends Service {

  async findById(uid) {
    const result = await this.ctx.curl(
      `${this.config.baseURL}/user?uid=${uid}`,
      {dataType: 'json', timeout: 30000}
    )
    return result.data
  }

}

module.exports = UserService
