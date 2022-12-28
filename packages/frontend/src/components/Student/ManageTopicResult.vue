<template>
  <template v-if="!open">
    <div class="py-2 mx-2 font-medium text-red-600 ">
      Hiện tại đang không có đợt kết quả đăng ký, vui lòng chọn mục khác!
    </div>
  </template>
  <template v-if="open">
    <div
      class="shadow-md sm:rounded-lg m-4"
    >
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
              Đợt đăng ký
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
              {{ displaySchedule(topic.scheduleId) }}
            </th>
            <th
              :key="`topic-${topic._id}`"
              scope="row"
              class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              {{ topic.code }}
            </th>
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
              {{ topic.description }}
            </th>
            <td class="py-2 pl-6">
              <th
                scope="row"
                class="py-2 px-4 font-medium text-gray-900  "
              >
                {{ displayLecturer(topic.lecturerId) }}
              </th>
            </td>

            <td class="py-2 px-6">
              <!-- <a
                class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                @click="handleRegisterTopic(topic._id)"
              >Đăng ký</a> -->
              <a
                class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
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
      'topicResult',
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
    await this.$store.dispatch('topic/fetchTopicResult', this.token);
    this.topics = this.topicResult;
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
    async handleShowTopic (id) {
      await this.$store.dispatch('url/updateSection', `${this.module}-view`);
      await this.$store.dispatch('url/updateId', id);
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
    displaySchedule (schedule) {
      return schedule ? schedule.name : '';
    },
    displayLecturer (lecturer) {
      return lecturer ? lecturer.name : '';
    },
    search () {
      if (this.searchVal !== '') {
        const topicFilter = this.topicResult.filter((topic) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (topic.title.match(re)) return true;
          if (topic.description.match(re)) return true;
          if (topic.code.match(re)) return true;
          if (!topic.lecturerId) return false;
          if (topic.lecturerId.name.match(re)) return true;
          return false;
        });
        this.topics = topicFilter;
      } else this.topics = this.topicResult;
    },
  },
};
</script>
