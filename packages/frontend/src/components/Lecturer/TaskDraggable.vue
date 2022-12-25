<template>
  <template
    v-if="topicId"
  >
    <button
      class=" m-4 text-white py-2 px-4 rounded"
      :class="[ showStatistic ? ' text-white bg-indigo-600 hover:bg-indigo-700' : 'text-indigo-600 bg-gray-100 hover:bg-blue-100 hover:text-indigo-700']"
      @click="statisticHandler"
    >
      Thống kê nhiệm vụ
    </button>
    <div class="inline-block w-fit border-2 rounded-md">
      <SearchInput
        v-model="searchVal"
        @keydown.space.enter="search"
      />
    </div>
    <div class="inline-block p-2 rounded-md">
      <select
        v-model="selectVal"
        class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        @change="selectHandler"
      >
        <option
          :key="`key-null`"
          :value="''"
        />
        <option
          v-for="option in listMember"
          :key="`key-${option._id}`"
          :value="option._id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <button
      v-if="!showStatistic"
      class=" m-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded float-right"
      @click="addTaskHandler"
    >
      Thêm nhiệm vụ
    </button>
  </template>
  <div class="flex overflow-x-scroll max-w-full">
    <div class="flex p-2 pr-0">
      <template v-if="!showStatistic">
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
      </template>
    </div>
    <template v-if="showStatistic">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            <th
              scope="col"
              class="py-3 px-6"
            >
              Mã
            </th>
            <th
              scope="col"
              class="py-3 px-6"
            >
              Tiêu đề
            </th>
            <th
              scope="col"
              class="py-3 px-6"
            >
              Trạng thái
            </th>
            <th
              scope="col"
              class="py-3 px-6"
            >
              Được phân công
            </th>
          </tr>
        </thead>
        <tr
          v-for="task in tasks"
          :key="task._id"
          class="bg-slate-300 hover:bg-gray-50"
        >
          <td class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap">
            <!-- {{ task }} -->
            {{ task.code }}
          </td>
          <td class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap">
            {{ task.title }}
          </td>
          <td class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap">
            <select
              v-model="task.status"
              disabled
              class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option
                v-for="option in columns"
                :key="`key-${option.value}`"
                :value="option.value"
              >
                {{ option.title }}
              </option>
            </select>
          </td>
          <td class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap">
            <select
              v-model="task.assignTo"
              disabled
              class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option
                v-for="option in listMember"
                :key="`key-${option._id}`"
                :value="option._id"
              >
                {{ option.name }}
              </option>
            </select>
          </td>
        </tr>
      </table>
    </template>
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
      showStatistic: false,
      taskId: '',
      columns: [
        {
          title: 'CHƯA GIẢI QUYẾT',
          value: 'PENDING',
        },
        {
          title: 'SẼ LÀM',
          value: 'TODO',
        },
        {
          title: 'ĐANG LÀM',
          value: 'IN_PROCESS',
        },
        {
          title: 'ĐÃ HOÀN THÀNH',
          value: 'DONE',
        },
      ],
      editTask: null,
      searchVal: '',
      selectVal: '',
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
      'listTask', 'topicId', 'listMember',
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
    selectHandler () {
      if (this.selectVal !== '') {
        console.log('🚀 ~ file: TaskDraggable.vue:267 ~ selectHandler ~ event', this.selectVal);
        const taskFilters = this.listTask.filter((st) => st.assignTo === this.selectVal);
        this.tasks = taskFilters;
      } else {
        this.tasks = this.listTask;
      }
    },
    statisticHandler () {
      this.showStatistic = !this.showStatistic;
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
