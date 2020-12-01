const Errors = require('./errors');
const HttpError = require('./httpError');

class HttpUnauthorized extends HttpError {
  /**
   * @param [params]
   */
  constructor(...params) {
    super(401, Errors.AUTH.NOT_LOGGED_IN, ...params);
  }
}

module.exports = HttpUnauthorized;
