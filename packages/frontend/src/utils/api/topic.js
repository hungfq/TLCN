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

  static async listAllTopicsByLecturerId (token, lecturerId) {
    const res = await axios.get(`/topic?lecturerId=${lecturerId}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicWithName (token, value, type) {
    const res = await axios.get(`/topic-search?value=${value}&type=${type}`, {
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

  static async listAllTopicsWithMajor (token, majorId) {
    const res = await axios.get(`/topic?majorId=${majorId}`, {
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

  static async createTopic (token, value) {
    const res = await axios.post('/topic', value, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async updateTopicById (token, value) {
    const res = await axios.put(`/topic/${value._id}`, value, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async deleteTopicById (token, id) {
    const res = await axios.delete(`/topic/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }
}
