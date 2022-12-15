<!-- eslint-disable max-len -->
<template>
  <div class="p-4 w-full h-full md:h-auto mx-auto mt-[10px]">
    <!-- Modal content -->
    <div
      v-if="isExistRegister"
      class="bg-white rounded-lg shadow"
    >
      <!-- Modal header -->
      <div class="flex justify-between items-start p-4 rounded-t border-b">
        <h3 class="text-xl font-semibold text-gray-900">
          Thông tin đề tài đã đăng ký
        </h3>
      </div>
      <div class="ml-5 grid grid-cols-2">
        <FormKit
          v-model="title"
          class="font-bold text-sm py-4 my-4"
          type="text"
          name="title"
          label="Tiêu đề"
          validation="required"
          :disabled="true"
        />
        <FormKit
          v-model="code"
          name="code"
          type="text"
          label="Mã đề tài"
          validation="required"
          :disabled="true"
        />
        <FormKit
          v-model="description"
          name="description"
          type="textarea"
          label="Mô tả"
          validation="required"
          :disabled="true"
        />
        <FormKit
          v-model="limit"
          name="limit"
          type="number"
          label="Số thành viên"
          validation="required"
          :disabled="true"
        />
        <FormKit
          v-model="major"
          name="major"
          type="text"
          label="Chuyên ngành"
          validation="required"
          :disabled="true"
        />
        <FormKit
          v-model="deadline"
          name="deadline"
          type="date"
          label="Thời hạn hoàn thành"
          :disabled="true"
        />
        <div class="w-3/4">
          <span class="font-bold text-sm">
            Giáo viên hướng dẫn
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="lecturerId"
              :options="listLecturers"
              :close-on-select="false"
              :disabled="true"
            />
          </div>
        </div>
        <div class="my-2-1 w-3/4">
          <span class="font-bold text-sm py-4 my-4">
            Sinh viên đăng kí
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="studentIds"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options="listStudents"
              :disabled="true"
            />
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleRemoveTopic"
        >
          Xóa đăng ký
        </button>
      </div>
    </div>
    <div v-else>
      Chưa tồn tại đăng ký của bạn
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { getValidationMessages } from '@formkit/validation';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'FormTopic',
  components: {
    Multiselect,
  },
  props: {
  },
  data () {
    return {
      id: '',
      title: '',
      code: '',
      description: '',
      limit: '',
      deadline: '',
      lecturerId: '',
      major: '',
      studentIds: [],
      listStudents: [
        'student1',
        'student2',
        'student3',
        'student4',
      ],
      listLecturers: [
        'lecturer1',
        'lecturer2',
        'lecturer3',
      ],
      messages: '',
      topic: null,
      schedule: null,
    };
  },
  computed: {
    ...mapGetters('url', [
      'page', 'module', 'section',
    ]),
    ...mapGetters('auth', [
      'token',
    ]),
    ...mapGetters('schedule', [
      'listSchedules',
    ]),
    isSave () {
      return this.section === 'topic-import';
    },
    isUpdate () {
      return this.section === 'topic-update';
    },
    isView () {
      return this.section === 'topic-view';
    },
    isExistRegister () {
      return !!this.topic;
    },
  },
  async mounted () {
    await this.$store.dispatch('topic/fetchTopicResult', this.token);
    await this.$store.dispatch('lecturer/fetchListLecturer', this.token);
    await this.$store.dispatch('student/fetchListStudent', this.token);
    await this.$store.dispatch('schedule/fetchListSchedules', this.token);
    const lecturers = this.$store.state.lecturer.listLecturer;
    const students = this.$store.state.student.listStudents;
    const { code } = this.$store.state.auth.userInfo;
    this.schedule = this.listSchedules.find((s) => s.students.code === code);
    this.listLecturers = lecturers.map((lecturer) => {
      let l = {
        value: lecturer._id,
        label: lecturer.name,
      };
      if (this.isView) {
        l = { ...l, disabled: true };
      }
      return l;
    });
    this.listStudents = students.map((student) => {
      let st = {
        value: student.code,
        label: `${student.name} - ${student.code}`,
      };
      if (this.isView) {
        st = { ...st, disabled: true };
      }
      return st;
    });
    const topic = this.$store.state.topic.topicResult;
    this.topic = topic;
    if (topic) {
      this.id = topic._id;
      this.title = topic.title;
      this.code = topic.code;
      this.description = topic.description;
      this.limit = topic.limit;
      if (topic.deadline) {
        const date = new Date(topic.deadline);
        const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0];
        this.deadline = dateString;
      }
      if (topic.lecturerId) this.lecturerId = topic.lecturerId;
      this.major = topic.major;
      this.studentIds = topic.students;
    }
  },
  methods: {
    rollBack () {
      this.$store.dispatch('url/updateSection', `${this.module}-list`);
    },
    async handleRemoveTopic () {
      try {
        const value = {
          id: this.id,
          token: this.token,
        };
        await this.$store.dispatch('topic/removeRegisterTopicStudent', value);
        this.$toast.success('Đã xóa thành công!');
        this.topic = null;
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>
