import axios from 'axios';

const apiDest = 'http://localhost:5000/v1';
axios.defaults.baseURL = apiDest;

export const signInWithGoogle = (access_token) => axios({
  method: 'POST',
  url: 'auth',
  data: {
    access_token,
  },
});

export default signInWithGoogle;
