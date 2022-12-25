<template>
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
            {{ topic.title }}
          </th>
          <th
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.code }}
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
            <!-- <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateTopic(topic._id)"
            >Sửa</a> -->
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

<script>
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
// Optionally import default styling
import 'vue-search-input/dist/styles.css';

export default {
  name: 'ManageTopicLecturer',
  components: {
    SearchInput,
  },
  data () {
    return {
      searchVal: '',
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
      'listTopics',
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
      const list = this.listTopics.map((t) => {
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
  mounted () {
    this.$store.dispatch('topic/fetchListTopics', this.token);
    this.$store.dispatch('student/fetchListStudent', this.token);
    this.$store.dispatch('schedule/fetchListSchedules', this.token);
    this.topics = this.listTopicsLecturer;
  },
  methods: {
    handleUpdateTopic (id) {
      this.$store.dispatch('url/updateSection', `${this.module}-update`);
      this.$store.dispatch('url/updateId', id);
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
  },
};
</script>
