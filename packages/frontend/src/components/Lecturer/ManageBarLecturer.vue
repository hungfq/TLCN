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
          :class="[ isTopic ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
          @click="updateModule('topic')"
        >
          Quản lý đề tài hướng dẫn
        </a>
        <!-- <a
          :class="[ isTopicProposal ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
          @click="updateModule('topic_proposal')"
        >
          Quản lý đề tài đề xuất
        </a> -->
        <a
          class="cursor-pointer"
          :class="[ isTopicProposalApprove ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
          @click="updateModule('topic_proposal_approve')"
        >
          Yêu cầu hướng dẫn
        </a>
        <a
          class="cursor-pointer"
          :class="[ isTopicAdvisorApprove ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
          @click="updateModule('topic_advisor_approve')"
        >
          Phê duyệt đề tài hướng dẫn
        </a>
        <a
          class="cursor-pointer"
          :class="[ isTopicCriticalApprove ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
          @click="updateModule('topic_critical_approve')"
        >
          Phê duyệt đề tài phản biện
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ManageBar',
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
    isTopicProposalApprove () {
      return this.module === 'topic_proposal_approve';
    },
    isTopicAdvisorApprove () {
      return this.module === 'topic_advisor_approve';
    },
    isTopicCriticalApprove () {
      return this.module === 'topic_critical_approve';
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
