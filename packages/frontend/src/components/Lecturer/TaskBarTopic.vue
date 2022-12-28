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
    class="fixed inset-y-0 left-0 z-10 flex-shrink-0 w-40 bg-white border-r-2 border-indigo-100 shadow-lg sm:left-2 rounded-tr-xl rounded-br-xl lg:static"
  >
    <nav
      aria-label="Main"
      class="flex items-center min-h-screen"
    >
      <div class="flex-1 px-1 space-y-2 overflow-hidden hover:overflow-auto">
        <template
          v-for="topic in listTopic"
          :key="`topic-${topic._id}`"
        >
          <button
            :class="[ isTopic(topic._id) ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
            @click="topicClick(topic._id)"
          >
            {{ topic.code }}: {{ topic.title }}
          </button>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TaskBar2',
  components: {
  },
  props: {
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'subModule', 'section', 'id',
    ]),
    ...mapGetters('task', [
      'listScheduleTopic', 'listTopic', 'listTask',
    ]),

  },
  mounted () {
  },
  methods: {
    async topicClick (id) {
      this.updateSubModule(`topic-${id}`);
      await this.$store.dispatch('task/fetchAllTask', { token: this.token, topicId: id });
      await this.$store.dispatch('task/fetchListStudents', { token: this.token, topicId: id });
    },
    isTopic (id) {
      return this.subModule === `topic-${id}`;
    },
    updateSubModule (subModule) {
      this.$store.dispatch('url/updateSubModule', subModule);
      this.$store.dispatch('url/updateSection', `${subModule}-task`);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
