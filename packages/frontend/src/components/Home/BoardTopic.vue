<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-col h-[800px] shadow-2xl rounded bg-white  mx-10 my-10 ">
    <span class="font-sans font-semibold text-lg mt-4 ml-4"> {{ nameMajor }}</span>
    <div class="h-full grid gap-x-4 gap-y-4 grid-cols-5 m-4">
      <img class="h-[300px] bg-gray-600 col-span-2 rounded-lg">
      <div class="h-[300px] bg-gray-600 rounded-lg" />
      <div class="h-[300px] bg-gray-600 rounded-lg" />
      <div class="h-[300px] bg-gray-600 rounded-lg" />
      <div class="h-[300px] bg-gray-600 rounded-lg" />
      <div class="h-[300px] bg-gray-600 rounded-lg" />
      <div class="h-[300px] bg-gray-600 rounded-lg" />
      <div class="h-[300px] bg-gray-600 rounded-lg" />
      <div class="h-[300px] bg-gray-600 rounded-lg" />
    </div>
  </div>
</template>
s
<script>
// import imgCNPM from "./"

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
