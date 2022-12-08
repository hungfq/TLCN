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
    class="fixed inset-y-0 left-0 z-10 flex-shrink-0 w-10 bg-white border-r-2 border-indigo-100 shadow-lg sm:left-2 rounded-tr-xl rounded-br-xl sm:w-16 lg:static lg:w-20"
  >
    <nav
      aria-label="Main"
      class="flex items-center min-h-screen"
    >
      <div class="flex-col flex-1 px-1 space-y-2 overflow-hidden hover:overflow-auto">
        <template
          v-for="schedule in listScheduleTopic"
          :key="`schedule-${schedule._id}`"
        >
          <button
            :class="[ isSchedule(schedule._id) ? 'flex p-2 items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg' : 'flex p-2   items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white']"
            @click="scheduleClick(schedule._id)"
          >
            {{ schedule.name }}
          </button>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TaskBar',
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
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('task', [
      'listScheduleTopic', 'listTopic',
    ]),

  },
  mounted () {
    this.$store.dispatch('task/fetchScheduleTopic', this.token);
  },
  methods: {
    scheduleClick (id) {
      this.updateModule(`schedule-${id}`);
      this.$store.dispatch('task/setListTopic', id);
    },
    updateModule (module) {
      this.$store.dispatch('url/updateModule', module);
    },
    isSchedule (id) {
      return this.module === `schedule-${id}`;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
