<!-- eslint-disable max-len -->
<template>
  <div class="h-[200px] m-2 flex">
    <div class="mx-8 center h-full items-center mt-14 w-1/2">
      <div class="font-sans font-medium text-blue-800">
        Xin chào, <span class="font-bold text-lg">{{ nameUser }}</span>
      </div>
      <div class="font-medium text-blue-800">
        Chúc bạn một ngày học tập và làm việc thật hiệu quả!
      </div>
    </div>
    <SearchBar
      v-if="showSearch"
      class="w-[400px]  mt-16 mr-10 ml-auto"
      @onClickSearch="handleSearch"
    />
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';

export default {
  name: 'HeaderBar',
  components: {
    SearchBar,
  },
  props: {
    nameUser: {
      type: String,
      default: 'Lê Quốc Bảo',
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
