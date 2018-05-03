'use strict'

module.exports = {
  Query: {
    user(root, {username, password}, ctx) {
      return ctx.connector.user.fetchByNamePassword(username, password)
    }
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
