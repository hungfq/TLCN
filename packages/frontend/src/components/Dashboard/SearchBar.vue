<!-- eslint-disable max-len -->
<template>
  <form>
    <div class="flex">
      <div class="relative w-full">
        <input
          id="search-dropdown"
          v-model="valueSearch"
          type="search"
          class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nhập tên đề tài, giáo viên"
          required=""
        >
        <button
          type="button"
          class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          @click="onClickSearch"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          /></svg>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  components: {
  },
  props: {
  },
  data () {
    return {
      valueSearch: '',
    };
  },
  computed: {
  },
  methods: {
    onClickSearch () {
      this.$emit('onClickSearch', this.valueSearch);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
