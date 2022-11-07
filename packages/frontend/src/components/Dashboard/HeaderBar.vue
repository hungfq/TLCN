<!-- eslint-disable max-len -->
<template>
  <div class="h-[200px] m-2 flex">
    <div class="mx-8 center h-full items-center mt-14 w-1/2">
      <div class="font-sans font-medium text-blue-800">
        Xin chào, <span class="font-bold text-lg">{{ nameUser }}</span>
      </div>
      <div class="font-medium text-blue-800">
        Chúc bạn một ngày làm việc và học tập hiệu quả!
      </div>
    </div>
    <SearchBar class="w-[400px]  mt-16 mr-10 ml-auto" />
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
