<template>
  <input
    class="w-8 border-2 rounded-md text-lg py-1 px-2 mr-auto"
    type="tel"
    min="1"
    max="9"
    maxlength="1"
  >
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'InputOTP',
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
