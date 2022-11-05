<template>
  <GoogleLogin :callback="callback" />
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
import { signInWithGoogle } from '../../utils/api/auth';

export default {
  name: 'LoginForm',
  methods: {
    async callback  (response) {
      try {
        const userData = decodeCredential(response.credential);
        const {
          email, name, picture, hd,
        } = userData;
        const rp = await signInWithGoogle({
          email, name, picture, hd,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
