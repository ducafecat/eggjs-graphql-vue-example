'use strict'

module.exports = {
  Query: {
    user(root, {username, password}, ctx) {
      return ctx.connector.user.fetchByNamePassword(username, password)
    },
    users(root, {}, ctx) {
      return ctx.connector.user.fetchAll()
    }
  },
  Mutation: {
    removeUser(root, { id }, ctx) {
      return ctx.connector.user.removeOne(id)
    },
  }
}

/* query
  {
    user(username: "hans", password: "345457yftgyhdsfghre") {
      id
      name
      token
    }
  }
  */
