import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export const signInWithGoogle = (access_token) => {
  try {
    const reponse = axios({
      method: 'POST',
      url: 'auth',
      data: {
        access_token,
      },
    });
    return reponse.data;
  } catch (e) {
    console.log(e.message);
  }
};

export default signInWithGoogle;
