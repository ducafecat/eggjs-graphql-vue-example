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

}

module.exports = UserConnector
