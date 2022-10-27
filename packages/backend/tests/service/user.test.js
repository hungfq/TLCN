/* eslint-disable max-len */
const mongoose = require('mongoose');
const { setupDB } = require('../utils/setup');
const {
  insert, remove, list, update,
} = require('../../src/v1/services/user.service');
const _User = require('../../src/v1/models/user.model');

const { ObjectId } = mongoose.Types;

setupDB();
describe('user service', () => {
  // beforeEach(() => {

  // });
  // afterAll(async () => {
  //   _User.collection.drop();
  // });

  test('insert user', async () => {
    jest.setTimeout(30000);
    const user = await insert('aaa', 'bbb', 'male', 'lequocbao29072001@gmail.com');
    const check = await _User.findOne({ email: 'lequocbao29072001@gmail.com' });
    expect(user._id.toString()).toBe(check._id.toString());
  });

  test('update user', async () => {
    jest.setTimeout(30000);
    const user = await insert('aaa', 'bbb', 'male', 'lequocbao29072001@gmail.com');
    await update(user._id, 'aaa', 'bbb', 'male', 'aaaa@gmail.com');
    const check = await _User.findOne({ _id: user._id });
    expect(check.email.toString()).toBe('aaaa@gmail.com');
  });

  test('delete user', async () => {
    jest.setTimeout(30000);
    const user = await _User.create({
      firstName: 'aaa',
      lastName: 'bbb',
      sex: 'male',
      email: 'lequocbao29072001@gmail.com',
    });
    await remove(user._id);
    const check = await _User.findOne({ email: 'lequocbao29072001@gmail.com' });
    expect(check).toBeNull();
  });

  test('list user', async () => {
    jest.setTimeout(30000);
    await _User.create({
      firstName: 'aaa',
      lastName: 'bbb',
      sex: 'male',
      email: `${ObjectId()}@gmail.com`,
    });
    await _User.create({
      firstName: 'aaa',
      lastName: 'bbb',
      sex: 'male',
      email: `${ObjectId()}@gmail.com`,
    });
    await _User.create({
      firstName: 'aaa',
      lastName: 'bbb',
      sex: 'male',
      email: `${ObjectId()}@gmail.com`,
    });
    const users = await list();
    expect(users.length).toBe(3);
  });
});
