const mongoose = require('mongoose');
const { setupDB } = require('../utils/setup');
const _Topic = require('../../src/v1/models/topic.model');
const {
  insert, remove, update, list, findOne,
} = require('../../src/v1/services/topic.service');

const { ObjectId } = mongoose.Types;

setupDB();
describe('topic service', () => {
  test('insert topic', async () => {
    jest.setTimeout(30000);
    const id = await ObjectId();
    const topic = await insert('ĐỀ TÀI 01', 'ABCBBCBC', 'ABC', id);
    const check = await _Topic.findOne({ lecturerId: id });
    expect(topic._id.toString()).toBe(check._id.toString());
  });

  test('findOne topic', async () => {
    jest.setTimeout(30000);
    const id = await ObjectId();
    const topic = await insert('ĐỀ TÀI 01', 'ABCBBCBC', 'ABC', id);
    const check = await findOne({ _id: topic._id });
    expect(topic._id.toString()).toBe(check._id.toString());
  });

  test('list topic', async () => {
    jest.setTimeout(30000);
    const id = await ObjectId();
    await insert('ĐỀ TÀI 01', 'ABCBBCBC', 'ABC', id);
    await insert('ĐỀ TÀI 02', 'ABCBBCBC', 'ABC', id);
    await insert('ĐỀ TÀI 03', 'ABCBBCBC', 'ABC', id);
    const topics = await list();
    expect(topics.length).toBe(3);
  });

  test('update topic', async () => {
    jest.setTimeout(30000);
    const id = await ObjectId();
    const topic = await insert('ĐỀ TÀI 01', 'ABCBBCBC', 'ABC', id);
    update(topic._id, 'ĐỀ TÀI 007', 'ABCBBCBC', 'ABC', id);
    const check = await _Topic.findOne({ _id: topic._id });
    expect(check.title).toBe('ĐỀ TÀI 007');
  });

  test('delete topic', async () => {
    jest.setTimeout(30000);
    const id = await ObjectId();
    const topic = await _Topic.create({
      title: 'ĐỀ TÀI 01',
      description: 'ABCBBCBC',
      type: 'ABC',
      lecturerId: id,
    });
    await remove(topic._id);
    const check = await _Topic.findOne({ title: 'ĐỀ TÀI 01' });
    expect(check).toBeNull();
  });
});
