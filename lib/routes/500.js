'use strict';

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  res.status(500);
  res.send('500: Internal Server Error');
};