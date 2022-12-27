<template>
  <template v-if="!open">
    <div class="py-2 mx-2 font-medium text-red-600 ">
      Hiện tại đang không có đợt đăng ký, vui lòng chọn mục khác!
    </div>
  </template>
  <template v-if="open">
    <div
      class="shadow-md sm:rounded-lg m-4"
    >
      <!-- <div class="my-4">
        <Multiselect
          v-model="currentScheduleId"
          :options="listSchedules"
          @change="handleChange"
        />
      </div> -->
      <div class="flex">
        <div class="inline-block p-2 rounded-md">
          <select
            v-model="currentScheduleId"
            class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            @change="handleChange"
          >
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
          class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
          @click="$store.dispatch('url/updateSection', 'topic-import')"
        >
          Thêm đề tài
        </div>
      </div>
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
              Tên đề tài
            </th>
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
              Số lượng
            </th>
            <th
              scope="col"
              class="py-3 px-6"
            >
              Giảng viên hướng dẫn
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
              class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              {{ topic.title }}
            </th>
            <th
              :key="`topic-${topic._id}`"
              scope="row"
              class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              {{ topic.code }}
            </th>
            <td class="py-2 pl-6">
              <th
                scope="row"
                class="py-2 px-4 font-medium text-gray-900  "
              >
                {{ topic.students.length }} / {{ topic.limit }}
              </th>
            </td>
            <td class="py-2 pl-6">
              <th
                scope="row"
                class="py-2 px-4 font-medium text-gray-900  "
              >
                {{ displayLecturer(topic.lecturerId) }}
              </th>
            </td>

            <td class="py-2 px-6">
              <a
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                @click="handleRegisterTopic(topic._id)"
              >Đăng ký</a>
              <a
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                @click="handleShowTopic(topic._id)"
              >Xem chi tiết</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
// Optionally import default styling
import 'vue-search-input/dist/styles.css';

export default {
  name: 'ManageTopicStudent',
  components: {
    SearchInput,
  },
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      searchVal: '',
      currentScheduleId: '',
      listSchedules: [],
      topics: [],
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
      'listTopicByScheduleStudent',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('student', [
      'studentId', 'studentEmail', 'student', 'listStudents',
    ]),
    ...mapGetters('schedule', [
      'listScheduleRegisterStudent',
    ]),
  },
  async mounted () {
    if (this.open) {
      await this.$store.dispatch('student/fetchListStudent', this.token);
      await this.$store.dispatch('schedule/fetchListScheduleToday', this.token);
      this.currentScheduleId = this.listScheduleRegisterStudent[0] ? this.listScheduleRegisterStudent[0]._id : '';
      this.listSchedules = this.listScheduleRegisterStudent;
      await this.$store.dispatch('topic/fetchListTopicBySchedule', { token: this.token, scheduleId: this.currentScheduleId });
      this.topics = this.listTopicByScheduleStudent || [];
    }
  },
  methods: {
    async handleRegisterTopic (id) {
      try {
        await this.$store.dispatch('topic/addRegisterTopicNew', { token: this.token, id });
        this.$toast.success('Đã đăng ký thành công!');
        this.topics = this.listTopicByScheduleStudent.map((c) => {
          if (c._id.toString() === id.toString()) {
            c.students.push(this.userId);
          }
          return c;
        });
        this.$store.dispatch('topic/fetchListTopicByStudent', this.token);
      } catch (e) {
        if (e.response.status === 400) this.$toast.error('Bạn đã tồn tại đăng ký, vui lòng xóa đăng ký hiện tại');
        else if (e.response.status === 404) this.$toast.error('Không tồn tại đề tài, vui lòng kiểm tra lại');
        else if (e.response.status === 422) this.$toast.error('Đã hết lượt đăng ký, vui lòng thử lại');
        else this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
    },
    async handleChange () {
      if (this.currentScheduleId) {
        await this.$store.dispatch('topic/fetchListTopicBySchedule', { token: this.token, scheduleId: this.currentScheduleId });
        this.topics = this.listTopicByScheduleStudent || [];
      }
    },
    handleShowTopic (id) {
      this.$store.dispatch('url/updateSection', `${this.module}-view`);
      this.$store.dispatch('url/updateId', id);
    },
    async handleRemoveTopic (id) {
      try {
        const value = {
          id,
          token: this.token,
        };
        await this.$store.dispatch('topic/removeTopic', value);
        this.$toast.success('Đã xóa thành công!');
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
    },
    displayLecturer (lecturer) {
      return lecturer ? lecturer.name : '';
    },
    search () {
      if (this.searchVal !== '') {
        const topicFilter = this.listScheduleRegisterStudent.filter((topic) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (topic.title.match(re)) return true;
          if (topic.code.match(re)) return true;
          if (!topic.lecturerId) return false;
          if (topic.lecturerId.name.match(re)) return true;
          return false;
        });
        this.topics = topicFilter;
      } else this.topics = this.listTopicsStudent;
    },
  },
};
</script>
