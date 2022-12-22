<template>
  <template
    v-if="topicId"
  >
    <button
      class=" m-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      @click="addTaskHandler"
    >
      Add task
    </button>
    <div class="inline-block w-fit border-2 rounded-md">
      <SearchInput
        v-model="searchVal"
        @keydown.space.enter="search"
      />
    </div>
  </template>
  <div class="flex overflow-x-scroll max-w-full">
    <div class="flex p-2 pr-0">
      <div
        v-for="column in columns"
        :key="column.title"
        class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
      >
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
          {{ column.title }}
        </p>
        <VueDraggableNext
          :list="tasks"
          :animation="200"
          ghost-class="ghost-card"
          group="tasks"
          @add="onDragEnd(column)"
        >
          <template v-for="(task) in tasks">
            <task-card
              v-if="task.status === column.value"
              :key="task._id"
              :task="task"
              class="mt-3 cursor-move"
              @dragend="handleChange(task)"
              @click="showTaskDetailModal(task._id)"
            />
          </template>
        </VueDraggableNext>
      </div>
    </div>
  </div>
  <TaskDetailModalVue
    v-model="showTaskDetail"
    :task-id="taskId"
    @close-detail-modal="closeTaskDetailModal"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import { VueDraggableNext } from 'vue-draggable-next';
import SearchInput from 'vue-search-input';
import TaskDetailModalVue from '../Modal/TaskDetailModal.vue';
import TaskCard from './TaskCard.vue';

export default {
  name: 'TaskDraggable',
  components: {
    TaskCard,
    VueDraggableNext,
    TaskDetailModalVue,
    SearchInput,
  },

  data () {
    return {
      showTaskDetail: false,
      taskId: '',
      columns: [
        {
          title: 'PENDING',
          value: 'PENDING',
        },
        {
          title: 'TO DO',
          value: 'TODO',
        },
        {
          title: 'IN PROGRESS',
          value: 'IN_PROCESS',
        },
        {
          title: 'DONE',
          value: 'DONE',
        },
      ],
      editTask: null,
      searchVal: '',
      tasks: [],
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
      'listTask', 'topicId',
    ]),
  },
  watch: {
    listTask: {
      handler () {
        this.tasks = this.listTask;
      },
    },
  },
  mounted () {
    this.tasks = this.listTask;
  },
  methods: {
    showTaskDetailModal (id) {
      this.showTaskDetail = true;
      this.taskId = id;
    },
    addTaskHandler () {
      this.showTaskDetail = true;
      this.taskId = '';
    },
    async closeTaskDetailModal (close) {
      await close();
    },
    sleep (ms) {
      // eslint-disable-next-line no-promise-executor-return
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async onDragEnd (column) {
      await this.sleep(1);
      if (this.editTask) {
        this.editTask.status = column.value;
        await this.$store.dispatch('task/updateTaskStatus', { token: this.token, value: this.editTask });
      }
      if (this.topicId) {
        await this.$store.dispatch('task/fetchAllTask', { token: this.token, topicId: this.topicId });
      }
      this.editTask = null;
      console.log('🚀 ~ file: TaskDraggable.vue:107 ~ onDragEnd ~ column', column);
    },
    handleChange (task) {
      this.editTask = null;
      this.editTask = task;
      console.log('🚀 ~ file: TaskDraggable.vue:111 ~ handleChange ~ task', task);
    },
    search () {
      if (this.searchVal !== '') {
        const taskFilters = this.listTask.filter((st) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (st.title.match(re)) return true;
          if (st.code.match(re)) return true;
          return false;
        });
        this.tasks = taskFilters;
      } else {
        this.tasks = this.listTask;
      }
    },
  },
};
</script>

<style scoped>
.column-width {
  min-width: 276px;
  width: 276px;
}
/* Unfortunately @apply cannot be setup in code sandbox,
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
/* .ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
} */
</style>
