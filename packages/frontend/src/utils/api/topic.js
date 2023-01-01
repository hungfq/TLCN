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

  static async getTopic (token, id) {
    const res = await axios.get(`/topic/${id}`, {
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

  static async listAllTopicsByLecturerIdAndScheduleId (token, lecturerId, scheduleId) {
    const res = await axios.get(`/topic?lecturerId=${lecturerId}&scheduleId=${scheduleId}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listAllTopicsByScheduleId (token, scheduleId) {
    const res = await axios.get(`/topic?scheduleId=${scheduleId}`, {
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

  static async listTopicAcceptRegisters (token) {
    const res = await axios.get('/topic-proposal/student', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async addRegisterTopic (token, id) {
    const res = await axios.post(`/topic-student/${id}`, {}, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async addRegisterTopicNew (token, id) {
    const res = await axios.post(`/register/${id}`, {}, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async removeRegisterTopicStudent (token, id) {
    const res = await axios.delete(`/register/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async getResultRegister (token) {
    const res = await axios.get('/topic/student/result', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicMember (token, topicId) {
    const res = await axios.get(`/topic/${topicId}/members`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicStudents (token, topicId) {
    const res = await axios.get(`/topic/${topicId}/students`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicAdvisorApprove (token) {
    const res = await axios.get('/topic-advisor', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async listTopicCriticalApprove (token) {
    const res = await axios.get('/topic-critical', {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async topicAdvisorApprove (token, id) {
    const res = await axios.get(`/topic-advisor/approve/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async topicCriticalApprove (token, id) {
    const res = await axios.get(`/topic-critical/approve/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async topicCommitteeByCritical (token, id) {
    const res = await axios.get(`/topic-committee/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return res.data;
  }

  static async importTopic (token, xlsx) {
    const formData = new FormData();

    formData.append('xlsx', xlsx);
    const res = await axios.post(
      '/topic-import',
      formData,
      {
        headers: {
          authorization: `bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  }
}
