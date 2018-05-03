'use strict'

const _options = {
  dataType: 'json',
  timeout: 30000
}

module.exports = {

  createAPI: (_this, url, method, data) => {
    let options = {
      ..._options,
      method,
      data
    }
    return _this.ctx.curl(
      `${_this.config.baseURL}${url}`,
      options
    )
  }
}
