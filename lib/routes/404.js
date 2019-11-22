/* eslint-disable no-unused-vars */
'use strict';

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  res.status(404);
  res.send('Not found');
  res.end();
};