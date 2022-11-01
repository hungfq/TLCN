<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-col h-[800px] shadow-2xl rounded bg-white  mx-10">
    <span class="font-sans font-semibold text-lg mt-4 ml-4"> {{ nameMajor }}</span>
    <div class="h-full bg-black" />
  </div>
</template>

<script>

export default {
  name: 'BoardTopic',
  components: {
  },
  props: {
    nameMajor: {
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
