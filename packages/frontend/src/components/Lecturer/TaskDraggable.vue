<template>
  <div class="flex  overflow-x-scroll max-w-full">
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
    :taskId="taskId"
    @close-error="closeTaskDetailModal"
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
    closeTaskDetailModal (close) {
      close();
    },
  },
};
</script>

<style scoped>
.column-width {
  min-width: 280px;
  width: 280px;
}
/* Unfortunately @apply cannot be setup in code sandbox,
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
/* .ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
} */
</style>
