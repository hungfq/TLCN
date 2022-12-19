
import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class RegisterApi {
  static async registerTopic (token, studentId, topicId) {
    const res = await axios.post('/register', {
      topic_id: topicId,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async studentViewRegister (token) {
    const res = await axios.get('/register', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async studentCancelRegister (token, registerId) {
    const res = await axios.delete(`/register/${registerId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listAllRegistration (token) {
    const res = await axios.get('/registration', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async createRegistration (token, topicId, studentId, group) {
    const res = await axios.post('/registration', {
      topicId, studentId, group,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async updateRegistration (token, registerId, topicId, studentId, group) {
    const res = await axios.put(`/registration/${registerId}`, {
      topicId, studentId, group,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }

  static async deleteRegistration (token, registerId) {
    const res = await axios.get(`/registration/${registerId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
}
