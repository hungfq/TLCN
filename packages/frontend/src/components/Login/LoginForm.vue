<template>
  <div class="w-1/2 h-4/5 bg-white rounded-lg flex flex-col">
    <div class="flex flex-row-reverse">
      <span class="mr-2 text-xl font-medium">x</span>
    </div>
    <div class="flex">
      <div class="w-8 h-8 border-2 rounded-full text-center">
        1
      </div>
      <div class="flex flex-col">
        <div>Sign in with email</div>
        <div>Please input your email address</div>
        <div class="flex">
          <input
            class="basic-3/4 border-2 rounded-m text-sm"
            placeholder="Email"
          >
          <div class="basic-1/4">
            Send
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="w-8 h-8 border-2 rounded-full text-center">
        2
      </div>
      <div class="flex flex-col">
        <div>Input your OTP</div>
        <div>Please input the OTP code send to the email</div>
        <div class="flex">
          <input
            class="w-4 border-2 rounded-m text-sm"
            type="tel"
            min="1"
            max="9"
            maxlength="1"
          >
          <input
            class="w-4 border-2 rounded-m text-sm"
            type="tel"
            min="1"
            max="9"
            maxlength="1"
          >
          <input
            class="w-4 border-2 rounded-m text-sm"
            min="1"
            max="9"
            maxlength="1"
          >

          <input
            class="w-4 border-2 rounded-m text-sm"
            min="1"
            max="9"
            maxlength="1"
          >

          <input
            class="w-4 border-2 rounded-m text-sm"
            min="1"
            max="9"
            maxlength="1"
          >

          <input
            class="w-4 border-2 rounded-m text-sm"
            min="1"
            max="9"
            maxlength="1"
          >
        </div>
        <div>
          Didn't receive the OTP code? <span class="text-blue-700 font-bold">Resend OTP</span>
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <hr class="w-2/3">
      <span class="shrink-0">Or</span>
      <hr class="w-2/3">
    </div>
    <div class="flex mx-auto">
      <div class="flex rounded border-2 h-10">
        <img
          class="w-6 h-6 my-auto rounded-sm ml-4 mr-2"
          src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"
        >
        <div class="h-6 my-auto ml-2 mr-4">
          Sign in with Google
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'LoginForm',
  props: {
  },
  data () {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
