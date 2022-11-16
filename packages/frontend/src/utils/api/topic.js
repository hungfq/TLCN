import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class TopicApi {
  static async listAllTopics(token) {
    const res = await axios.get('/topic', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicWithName(token, value, type) {
    const res = await axios.get(`/topic-search?value=${value}&type=${type}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }
}
