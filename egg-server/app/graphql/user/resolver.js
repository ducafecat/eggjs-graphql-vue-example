'use strict';

module.exports = {
  Query: {
    user(root, { username, password }, ctx) {
      return ctx.connector.user.fetchByNamePassword(username, password);
    },
  },
};
