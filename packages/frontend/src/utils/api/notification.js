import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class NotificationApi {
  static async listAllNotification (token) {
    const res = await axios.get('/notification', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async readNotification (token, id) {
    const res = await axios.post(`/notification/${id}`, {}, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async deleteNotification (token, id) {
    const res = await axios.delete(`/notification/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }
}
