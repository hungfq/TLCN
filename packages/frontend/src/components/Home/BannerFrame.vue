<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-col h-[400px] shadow-2xl rounded bg-gradient-to-r from-cyan-500 to-blue-500  mx-10">
    <span class="font-sans mx-auto text-6xl mt-auto font-semibold text-white"> ĐĂNG KÍ ĐỀ TÀI CÙNG</span>
    <span class="font-sans mx-auto text-6xl mb-auto font-semibold text-white"> FITHCMUTE</span>
  </div>
</template>

<script>

export default {
  name: 'BannerFrame',
  components: {
  },
  props: {
    nameItem: {
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
