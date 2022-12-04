<template>
  <!-- component -->
  <!-- This is an example component -->
  <div class="flex">
    <div class="w-full mx-4 my-4">
      <div class="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
        <div class="flex flex-row">
          <div class="ml-2 mr-6">
            <span class="font-semibold">Successfully Saved!</span>
            <span class="block text-gray-500">Anyone with a link can now view this file</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'NotificationComponent',
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
        let listStudents = t.students.map((s) => this.listStudents.find((st) => st.code.toString() === s.toString()));
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
        if (listStudents.length < 1) listStudents = [{ code: '', name: '' }];
        return {
          ...t, studentInfo: listStudents, scheduleInfo,
        };
      });
      const newList = list.filter((item) => item.lecturerId._id.toString() === this.userId.toString());
      return newList;
    },
  },
  mounted () {
    this.$store.dispatch('topic/fetchListTopics', this.token);
    this.$store.dispatch('student/fetchListStudent', this.token);
    this.$store.dispatch('schedule/fetchListSchedules', this.token);
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
  },
};
</script>
