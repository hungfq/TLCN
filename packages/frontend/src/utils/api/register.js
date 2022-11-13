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
}
