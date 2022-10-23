<!-- eslint-disable max-len -->
<template>
  <div class="w-[50rem] h-[30rem] bg-white rounded-lg flex flex-col">
    <div class="flex flex-row-reverse">
      <span class="mx-4 text-xl font-medium">x</span>
    </div>
    <div class="mx-auto">
      <ChildLayout
        :serial-number="1"
        :first-text="'Sign in with email'"
        :second-text="'Please input your email address'"
      >
        <SendEmail />
      </ChildLayout>
      <ChildLayout
        :serial-number="2"
        :first-text="'Input your OTP'"
        :second-text="'Please input the OTP code send to the email'"
      >
        <div class="flex">
          <ListInputOTP />
        </div>
        <div class="text-sm m-2 items-center">
          Didn't receive the OTP code? <span class="text-blue-700 font-bold">Resend OTP</span>
        </div>
      </ChildLayout>
      <div class="flex items-center mb-2">
        <hr class="w-2/3">
        <span class="shrink-0">Or</span>
        <hr class="w-2/3">
      </div>
      <SignInWithGoogle />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import ChildLayout from './ChildLayout.vue';
import SendEmail from './SendEmail.vue';
import ListInputOTP from './ListInputOTP.vue';
import SignInWithGoogle from './SignInWithGoogle.vue';

export default {
  name: 'LoginForm',
  components: {
    ChildLayout,
    SendEmail,
    ListInputOTP,
    SignInWithGoogle,
  },
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
