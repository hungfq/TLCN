<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    @before-open="handleShow(taskId)"
  >
    <div class="relative p-4 w-full max-w-6xl mx-auto mt-[5%]">
      <!-- Modal content -->
      <div class="relative bg-white rounded-md shadow">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b ">
          <h2 class="text-xl font-semibold text-gray-900 ">
            <!-- {{ taskDetail.code }} -->
            <input
              v-model="taskDetail.code"
              class="w-full p-2"
              placeholder="Mã nhiệm vụ..."
            >
          </h2>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="defaultModal"
            @click="close"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="px-6 grid grid-cols-12 gap-4">
          <!-- Left body -->
          <div class="col-span-9">
            <div class="font-medium my-4">
              <input
                v-model="taskDetail.title"
                class="w-full p-2"
                placeholder="Tên nhiệm vụ"
              >
            </div>
            <!-- <div class="font-medium my-4">
              {{ taskDetail }}
            </div> -->
            <div class="h-80 overflow-x-scroll">
              <ckeditor
                v-model="editorData"
                :editor="editor"
                @input="changeDescription"
              />
              <template
                v-for="item in taskDetail.comments"
                :key="item._id"
              >
                <TaskDetailComment
                  :comment="item"
                  :task-id="taskDetail._id"
                />
              </template>
            </div>
            <div class="font-normal my-4 flex space-x-1">
              <input
                v-model="comment"
                class=" p-2 border-2 rounded-sm flex-1"
                placeholder="Thêm nhận xét..."
                @keyup.enter="addComment"
              >
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                @click="addComment"
              >
                Gửi
              </button>
            </div>
          </div>
          <!-- Right body -->
          <div class="col-span-3">
            <div class="font-normal my-4">
              Trạng thái:
              <select
                v-model="taskDetail.status"
                class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option
                  v-for="option in statuses"
                  :key="`key-${option.value}`"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
            <div class="font-normal my-4">
              Được phân công:
              <select
                v-model="taskDetail.assignTo"
                class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option
                  v-for="option in listStudents"
                  :key="`key-${option._id}`"
                  :value="option._id"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>
            <template v-if="taskDetail.createdByFilter">
              <div class="font-normal my-4">
                Tạo bởi: {{ taskDetail.createdByFilter ? taskDetail.createdByFilter.name : 'none' }}
              </div>
            </template>
            <template v-if="taskDetail.createdAt">
              <div class="font-normal my-4">
                Tạo mới: {{ timeAgo(taskDetail.createdAt) }}
              </div>
            </template>
            <template v-if="taskDetail.updatedAt">
              <div class="font-normal my-4">
                Cập nhật: {{ timeAgo(taskDetail.updatedAt) }}
              </div>
            </template>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              @click="saveHandle(close)"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>
<script>
import { mapGetters } from 'vuex';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
import 'moment/dist/locale/vi';
import TaskDetailComment from '../Lecturer/TaskDetailComment.vue';

export default {
  name: 'TaskDetailModal',
  components: {
    TaskDetailComment,
  },
  inheritAttrs: false,
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor, vue/require-default-prop
    taskId: '',
  },
  emits: ['closeDetailModal'],
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      statuses: [
        { text: 'CHƯA GIẢI QUYẾT', value: 'PENDING' },
        { text: 'SẼ LÀM', value: 'TODO' },
        { text: 'ĐANG LÀM', value: 'IN_PROCESS' },
        { text: 'ĐÃ HOÀN THÀNH', value: 'DONE' },
      ],
      comment: '',
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
      'listScheduleTopic', 'listTopic', 'topicId', 'listStudents', 'taskDetail',
    ]),
  },
  methods: {
    async handleShow (taskId) {
      await this.$store.dispatch('task/fetchTaskDetail', { token: this.token, taskId });
      if (this.taskDetail) {
        this.editorData = this.taskDetail.description;
      }
    },
    async changeDescription (data) {
      if (this.taskDetail) {
        this.taskDetail.description = data;
      }
    },
    async saveHandle (close) {
      if (this.taskDetail._id) {
        await this.$store.dispatch('task/updateTask', { token: this.token, value: this.taskDetail });
      } else {
        await this.$store.dispatch('task/insertTask', { token: this.token, value: this.taskDetail, topicId: this.topicId });
      }
      if (this.topicId) {
        await this.$store.dispatch('task/fetchAllTask', { token: this.token, topicId: this.topicId });
      }
      this.$emit('closeDetailModal', close);
    },
    async addComment () {
      if (this.comment !== '') {
        await this.$store.dispatch('task/insertComment', { token: this.token, message: this.comment, taskId: this.taskDetail._id });
        this.comment = '';
      }
    },
    timeAgo (createdAt) {
      moment.updateLocale('vi');
      return moment(createdAt).fromNow();
    },
  },
};
</script>
