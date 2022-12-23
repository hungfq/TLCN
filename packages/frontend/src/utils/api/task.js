import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export default class TaskApi {
  static async listAllTask (token, topicId) {
    const res = await axios.get(`/task?topicId=${topicId}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async getTaskDetail (token, taskId) {
    const res = await axios.get(`/task/${taskId}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async insertTask (token, value, topicId) {
    const {
      code, title, description, status, process, assignTo,
    } = value;
    const res = await axios.post('/task', {
      topicId, code, title, description, status, process, assignTo,
    }, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async updateTask (token, value) {
    const {
      _id, code, title, description, status, process, assignTo,
    } = value;
    const res = await axios.put(`/task/${_id}`, {
      code, title, description, status, process, assignTo,
    }, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async updateTaskStatus (token, value) {
    const {
      _id, status,
    } = value;
    const res = await axios.put(`/task-status/${_id}`, {
      status,
    }, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async insertComment (token, message, taskId) {
    const res = await axios.post(`/task-comment/${taskId}`, {
      message,
    }, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async removeComment (token, commentId, taskId) {
    const res = await axios.delete(`/task-comment/${taskId}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
      data: {
        commentId,
      },
    });
    return res.data;
  }
}
