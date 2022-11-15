import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class TopicApi {
  static async listAllTopics (token) {
    const res = await axios.get('/topic', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicById (token, id) {
    const res = await axios.get(`/topic/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicWithName (token, title) {
    const res = await axios.get(`/topic?title=${title}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicSearch (token, value) {
    const res = await axios.get(`/topic-search?value=${value}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicSearchWithTitle (token, value) {
    const res = await axios.get(`/topic-search?type=title&value=${value}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicSearchWithNameTeacher (token, nameTeacher) {
    const res = await axios.get(`/topic-search?type=teacher&value=${nameTeacher}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async createTopic (token, title, description, limit, lecturerId, majorId) {
    const res = await axios.post('/topic', {
      title, description, limit, lecturerId, majorId,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async updateTopicById (token, id, title, description, limit, lecturerId, majorId) {
    const res = await axios.put(`/topic/${id}`, {
      title, description, limit, lecturerId, majorId,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async deleteTopicById (token, id) {
    const res = await axios.get(`/topic/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }
}
