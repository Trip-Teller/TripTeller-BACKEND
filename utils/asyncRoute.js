/**
 * @param {function} asyncFunction
 * @returns {function(...[*]=)}
 */
const asyncRoute = (asyncFunction) => async (req, res, next) => {
  try {
    return await asyncFunction(req, res, next);
  } catch (e) {
    return next(e);
  }
};

module.exports = asyncRoute;
