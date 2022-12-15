<template>
  <button
    class=" m-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
    @click="addTaskHandler"
  >
    Add task
  </button>
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
          :list="listTask"
          :animation="200"
          ghost-class="ghost-card"
          group="tasks"
          @end="onDragEnd(column)"
        >
          <template v-for="(task) in listTask">
            <task-card
              v-if="task.status === column.value"
              :key="task._id"
              :task="task"
              class="mt-3 cursor-move"
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
import TaskDetailModalVue from '../Modal/TaskDetailModal.vue';
import TaskCard from './TaskCard.vue';

export default {
  name: 'TaskDraggable',
  components: {
    TaskCard,
    VueDraggableNext,
    TaskDetailModalVue,
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
  methods: {
    showTaskDetailModal (id) {
      this.showTaskDetail = true;
      this.taskId = id;
    },
    addTaskHandler () {
      this.showTaskDetail = true;
      this.taskId = '';
    },
    closeTaskDetailModal (close) {
      close();
    },
    onDragEnd (data) {
      console.log('🚀 ~ file: TaskDraggable.vue:107 ~ onDragEnd ~ data', data);
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
