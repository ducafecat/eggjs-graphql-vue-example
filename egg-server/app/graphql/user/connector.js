'use strict'

const DataLoader = require('dataloader')

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch(id) {
    const user = this.ctx.service.user
    return new Promise(function(resolve, reject) {
      const users = user.findById(id)
      resolve(users)
    })
  }

  fetchById(id) {
    return this.loader.load(id)
  }

  // 用户登录
  fetchByNamePassword(username, password) {
    let user = this.ctx.service.user.findByUsernamePassword(username, password)
    return user
  }
}

module.exports = UserConnector
