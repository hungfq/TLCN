<template>
  <div class="shadow-md sm:rounded-lg m-4">
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
            Đợt đăng ký
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
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="topic in listTopicsStudent"
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
          <td class="py-4 pl-4">
            <th
              scope="row"
              class="py-4 px-4 font-medium text-gray-900  "
            >
              {{ topic.scheduleInfo ? topic.scheduleInfo.name : '' }}
            </th>
          </td>
          <td class="py-4 pl-6">
            <th
              scope="row"
              class="py-4 px-4 font-medium text-gray-900  "
            >
              {{ topic.students.length }} / {{ topic.limit }}
            </th>
          </td>

          <td class="py-4 px-6">
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

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'ManageStudentLecturer',
  components: {

  },
  data () {
    return {

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
      'listTopicByStudent',
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
    listTopicsStudent () {
      if (!this.listTopicByStudent || this.listTopicByStudent.length < 1) return [];
      const list = this.listTopicByStudent.map((t) => {
        let scheduleInfoId = null;
        let scheduleInfo = null;
        this.listSchedules.forEach((s) => {
          const she = s.topics.find((code) => code === t.code);
          if (she) {
            scheduleInfoId = s._id;
          }
        });
        if (scheduleInfoId) {
          scheduleInfo = this.listSchedules.find((s) => s._id.toString() === scheduleInfoId.toString());
        }
        return {
          ...t, scheduleInfo,
        };
      });
      return list;
    },
  },
  mounted () {
    this.$store.dispatch('topic/fetchListTopicByStudent', this.token);
    this.$store.dispatch('student/fetchListStudent', this.token);
    this.$store.dispatch('schedule/fetchListSchedules', this.token);
  },
  methods: {
    async handleRegisterTopic (id) {
      try {
        await this.$store.dispatch('topic/addRegisterTopic', { token: this.token, id });
        this.$toast.success('Đã đăng ký thành công!');
      } catch (e) {
        if (e.response.status === 400) this.$toast.error('Bạn đã tồn tại đăng ký, vui lòng xóa đăng ký hiện tại');
        else if (e.response.status === 404) this.$toast.error('Không tồn tại đề tài, vui lòng kiểm tra lại');
        else if (e.response.status === 422) this.$toast.error('Đã hết lượt đăng ký, vui lòng thử lại');
        else this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
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
  },
};
</script>
