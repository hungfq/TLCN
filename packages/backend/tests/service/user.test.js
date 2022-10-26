/* eslint-disable max-len */
const { setupDB } = require('../utils/setup');
const { insert } = require('../../src/v1/services/user.service');
const _User = require('../../src/v1/models/user.model');

setupDB();
describe('user service', () => {
  beforeEach(() => {

  });
  afterAll(async () => {
    _User.collection.drop();
  });

  test('insert service', async () => {
    jest.setTimeout(30000);
    const user = await insert('aaa', 'bbb', 'male', 'lequocbao29072001@gmail.com');
    const check = await _User.findOne({ email: 'lequocbao29072001@gmail.com' });
    expect(user._id.toString()).toBe(check._id.toString());
  });
});
