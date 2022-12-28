<!-- eslint-disable max-len -->
<template>
  <div
    x-transition:enter="transform transition-transform duration-300"
    x-transition:enter-start="-translate-x-full"
    x-transition:enter-end="translate-x-0"
    x-transition:leave="transform transition-transform duration-300"
    x-transition:leave-start="translate-x-0"
    x-transition:leave-end="-translate-x-full"
    x-show="isSidebarOpen"
    class="fixed inset-y-0 left-0 z-10 flex-shrink-0 w-64 bg-white border-r-2 border-indigo-100 shadow-lg sm:left-16 rounded-tr-3xl rounded-br-3xl sm:w-72 lg:static lg:w-64"
  >
    <nav
      aria-label="Main"
      class="flex flex-col h-full"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center flex-shrink-0 py-10">
        <a href="#">
          <img
            class="w-2/3 mx-auto"
            src="/fit.png"
          >
        </a>
      </div>

      <!-- Links -->
      <div class="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto">
        <a
          class="cursor-pointer"
          :class="[ isTopic ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
          @click="updateModule('topic')"
        >
          Đăng ký đề tài
        </a>
        <a
          class="cursor-pointer"
          :class="[ isTopicProposal ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
          @click="updateModule('topic_proposal')"
        >
          Đề xuất đề tài
        </a>
        <a
          class="cursor-pointer"
          :class="[ isResult ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
          @click="updateModule('topic_result')"
        >
          Kiểm tra kết quả
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ManageBarStudent',
  components: {
  },
  props: {
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    isTopic () {
      return this.module === 'topic';
    },
    isTopicProposal () {
      return this.module === 'topic_proposal';
    },
    isResult () {
      return this.module === 'topic_result';
    },
  },
  mounted () {
  },
  methods: {
    updateModule (module) {
      this.$store.dispatch('url/updateModule', module);
      this.$store.dispatch('url/updateSection', `${module}-list`);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
