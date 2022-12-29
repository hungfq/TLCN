<template>
  <div class="flex">
    <div class="inline-block p-2 rounded-md">
      <select
        v-model="selectVal"
        class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        @change="selectHandler"
      >
        <!-- <option
          :key="`key-null`"
          :value="''"
        /> -->
        <option
          v-for="option in listSchedules"
          :key="`key-${option._id}`"
          :value="option._id"
        >
          {{ option.code }} : {{ option.name }}
        </option>
      </select>
    </div>
    <div
      v-if="canEdit"
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      @click="$store.dispatch('url/updateSection', 'topic-import')"
    >
      Thêm đề tài
    </div>
  </div>
  <div class="shadow-md sm:rounded-lg m-4">
    <SearchInput
      v-model="searchVal"
      :search-icon="true"
      @keydown.space.enter="search"
    />
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-300">
        <tr>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Mã đề tài
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên đề tài
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Mô tả
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Danh sách sinh viên
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="topic in topics"
          :key="`topic-${topic._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.code }}
          </th>
          <th
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.title }}
          </th>
          <th
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 w-4"
          >
            {{ topic.description }}
          </th>
          <td class="py-4 px-6">
            <div class="font-mono cursor-pointer">
              <!-- {{ topic.studentInfo }} -->
              <template v-if="topic.studentInfo && topic.studentInfo.length > 0">
                <li
                  v-for="student in topic.studentInfo"
                  :key="`${Math.floor(Math.random() * 10000000000)}-${student}`"
                >
                  {{ student ? student.name : '' }} - {{ student ? student.code : '' }}
                </li>
              </template>
            </div>
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowTopic(topic._id)"
            >Xem chi tiết</a>
            <a
              v-if="canEdit"
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateTopic(topic._id)"
            >Sửa</a>
            <a
              v-if="canEdit"
              class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
              @click="handleRemoveTopic(topic._id)"
            >Xóa</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ConfirmModal
    v-model="showConfirmModal"
    @confirm="confirmRemove"
    @cancel="showConfirmModal=false"
  >
    <template #title>
      Xác nhận
    </template>
    <div>Bạn có xác nhận xóa đề tài này không?</div>
  </ConfirmModal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
import ConfirmModal from '../Modal/ConfirmModal.vue';
// Optionally import default styling
import 'vue-search-input/dist/styles.css';

export default {
  name: 'ManageTopicLecturer',
  components: {
    SearchInput,
    ConfirmModal,
  },
  data () {
    return {
      selectVal: '',
      searchVal: '',
      topics: [],
      canEdit: false,
      showConfirmModal: false,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('topic', [
      'listTopicsByLecturerSchedule',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('student', [
      'studentId', 'studentEmail', 'student', 'listStudents',
    ]),
    ...mapGetters('schedule', [
      'listSchedules',
    ]),
    listTopicsLecturer () {
      const list = this.listTopicsByLecturerSchedule.map((t) => {
        const listStudents = t.students.map((s) => this.listStudents.find((st) => st.code.toString() === s.toString()));
        return {
          ...t, studentInfo: listStudents,
        };
      });
      const newList = list.filter((item) => {
        if (!item.lecturerId) return false;
        return item.lecturerId._id.toString() === this.userId.toString();
      });
      return newList;
    },
  },
  watch: {
    listTopicsByLecturerSchedule: {
      handler () {
        this.topics = this.listTopicsLecturer;
      },
    },
  },
  async mounted () {
    await this.$store.dispatch('student/fetchListStudent', this.token);
    await this.$store.dispatch('schedule/fetchListSchedules', this.token);
    this.topics = this.listTopicsLecturer;
    this.selectVal = this.listSchedules[0] ? this.listSchedules[0]._id : null;
    this.$store.commit('topic/setTopicScheduleId', this.selectVal);
    if (this.selectVal) { await this.$store.dispatch('topic/fetchListTopicByLecturerSchedule', { token: this.token, lecturerId: this.userId, scheduleId: this.selectVal }); }
    this.checkCanEdit(this.selectVal);
  },
  methods: {
    async handleUpdateTopic (id) {
      await this.$store.dispatch('url/updateSection', `${this.module}-update`);
      await this.$store.dispatch('url/updateId', id);
    },
    async handleShowTopic (id) {
      await this.$store.dispatch('url/updateSection', `${this.module}-view`);
      await this.$store.dispatch('url/updateId', id);
    },
    async confirmRemove () {
      const id = this.removeId;
      this.showConfirmModal = false;
      try {
        const value = {
          id,
          token: this.token,
        };
        await this.$store.dispatch('topic/removeTopic', value);
        await this.$store.dispatch('topic/fetchListTopicByLecturerSchedule', { token: this.token, lecturerId: this.userId, scheduleId: this.selectVal });
        this.$toast.success('Đã xóa thành công!');
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }

      this.removeId = '';
    },
    async handleRemoveTopic (id) {
      this.removeId = id;
      this.showConfirmModal = true;
    },
    displayLecturer (lecturer) {
      return lecturer ? lecturer.name : '';
    },
    search () {
      if (this.searchVal !== '') {
        const topicFilter = this.listTopicsLecturer.filter((topic) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (topic.title.match(re)) return true;
          if (topic.code.match(re)) return true;
          for (let i; i < topic.students.length; i += 1) {
            if (topic.students[i]) {
              if (topic.students[i].name.match(re)) return true;
              if (topic.students[i].code.match(re)) return true;
            }
          }
          return false;
        });
        this.topics = topicFilter;
      } else this.topics = this.listTopicsLecturer;
    },
    async selectHandler () {
      this.checkCanEdit(this.selectVal);
      this.$store.commit('topic/setTopicScheduleId', this.selectVal);
      await this.$store.dispatch('topic/fetchListTopicByLecturerSchedule', { token: this.token, lecturerId: this.userId, scheduleId: this.selectVal });
    },
    checkCanEdit (scheduleId) {
      const schedule = this.listSchedules.filter((sc) => sc._id === scheduleId)[0];
      if (schedule) {
        const now = Date.now();
        const start = new Date(schedule.startApproveDate);
        const end = new Date(schedule.endApproveDate);
        this.canEdit = (start < now && now < end);
      }
    },
  },
};
</script>
