<!-- eslint-disable max-len -->
<template>
  <div class="flex h-[120px] shadow-2xl rounded bg-blue-900 mx-10 items-center">
    <div class="flex flex-col mx-auto ">
      <span class="font-medium text-white">21 năm</span>
      <span class="font-medium text-white">Thành lập và phát triển</span>
    </div>
    <div class="flex flex-col mx-auto">
      <span class="font-medium text-white">Hơn 1000 sinh viên</span>
      <span class="font-medium text-white">Ra trường mỗi năm</span>
    </div>
    <div class="flex flex-col mx-auto">
      <span class="font-medium text-white">Đạt giải cao trong</span>
      <span class="font-medium text-white">Các cuộc thi quốc tế</span>
    </div>
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
