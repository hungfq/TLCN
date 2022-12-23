<!-- eslint-disable max-len -->
<template>
  <div class="h-[200px] m-2 flex">
    <div class="mx-8 center h-full items-center mt-14 w-1/2">
      <div class="font-sans font-medium text-blue-800">
        Xin chào, <span class="font-bold text-lg">{{ username }}</span>
      </div>
      <div class="font-medium text-blue-800">
        Chúc bạn một ngày học tập và làm việc thật hiệu quả!
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeaderBar',
  components: {
  },
  props: {
    username: {
      type: String,
      default: '',
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
    };
  },
  computed: {
  },
  methods: {
    handleSearch (value) {
      this.$emit('search-header', { value, type: '' });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
