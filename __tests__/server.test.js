'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');
// jest.mock()

const mockRequest = supertester(server);
// this is actually server.js > server
// (akin to server.start, we're doing server.server)

describe('web server', () => {
  it('should respond properly on request to /people', () => {
    mockRequest
      .get('/people')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.count).toBe(4);
      })
      .catch(console.error);
  });
  it('should respond properly on a get request to /teams', async () => {
    let results = await mockServer.get('/teams');
    expect(results.status).toBe(200);
  });

});
