<template>
  <InputOTP />
  <InputOTP />
  <InputOTP />
  <InputOTP />
  <InputOTP />
  <InputOTP />
</template>

<script>
import InputOTP from './InputOTP.vue';

export default {
  name: 'ListInputOTP',
  components: {
    InputOTP,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
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
