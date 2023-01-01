<!-- eslint-disable max-len -->
<template>
  <div
    class="mx-4 my-4 rounded px-2 py-2 bg-slate-500 w-fit text-white font-semibold cursor-pointer"
    @click="rollBack"
  >
    Quay về
  </div>
  <div class="p-4 w-full h-full md:h-auto mx-auto mt-[10px]">
    <!-- Modal content -->
    <div class="bg-white rounded-lg shadow">
      <!-- Modal header -->
      <div class="flex justify-between items-start p-4 rounded-t border-b">
        <h3 class="text-xl font-semibold text-gray-900">
          Thông tin đề tài đã đăng ký
        </h3>
      </div>
      <div class="ml-5 grid grid-cols-2">
        <FormKit
          v-model="title"
          type="text"
          name="title"
          label="Tiêu đề"
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
          v-model="limit"
          name="limit"
          type="number"
          label="Số thành viên"
          :disabled="true"
        />
        <FormKit
          v-model="
            thesisDefenseDate"
          name="thesisDefenseDate"
          type="date"
          label="Thời hạn phản biện"
          :disabled="true"
        />
        <div class="w-2/5">
          <span class="font-bold text-sm">
            Giáo viên hướng dẫn
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="lecturerId"
              :options="listLecturers"
              :searchable="true"
              :disabled="true"
            />
          </div>
        </div>
        <div class="w-2/5">
          <span class="font-bold text-sm">
            Giáo viên phản biện
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="criticalLecturerId"
              :options="listLecturers"
              :searchable="true"
              :disabled="true"
            />
          </div>
        </div>
        <div class="my-2-1 w-2/5">
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
        <div class="my-2-1 w-2/5">
          <span class="font-bold text-sm py-4 my-4">
            Đợt đăng ký
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="scheduleId"
              :options="listSchedules"
              :searchable="true"
              :disabled="true"
            />
          </div>
        </div>
        <FormKit
          v-model="advisorLecturerGrade"
          type="number"
          label="Điểm của giảng viên hướng dẫn"
          :disabled="true"
        />
        <FormKit
          v-model="criticalLecturerGrade"
          type="number"
          label="Điểm của giảng viên phản biện"
          :disabled="true"
        />
        <FormKit
          v-model="committeePresidentGrade"
          type="number"
          label="Điểm của chủ tịch hội đồng"
          :disabled="true"
        />
        <FormKit
          v-model="committeeSecretaryGrade"
          name="limit"
          type="number"
          label="Điểm của thư ký"
          :disabled="true"
        />
        <FormKit
          v-model="description"
          name="description"
          type="textarea"
          label="Mô tả"
          help="Ghi các thông tin chi tiết tại đây"
          :disabled="true"
        />
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
        <button
          v-if="canUnregister"
          type="button"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4  focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          @click="handleRemoveTopic"
        >
          Xóa đăng ký
        </button>
      </div>
    </div>
  </div>
  <ConfirmModal
    v-model="showConfirmModal"
    @confirm="confirmRemove"
    @cancel="showConfirmModal=false"
  >
    <template #title>
      Xác nhận
    </template>
    <div>Bạn sẽ xóa  đúng không?</div>
  </ConfirmModal>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { mapGetters } from 'vuex';
import ConfirmModal from '../Modal/ConfirmModal.vue';

export default {
  name: 'FormTopic',
  components: {
    Multiselect,
    ConfirmModal,
  },
  props: {
  },
  data () {
    return {
      showConfirmModal: false,
      title: '',
      code: '',
      description: '',
      limit: '',
      lecturerId: '',
      criticalLecturerId: '',
      studentIds: [],
      scheduleId: '',
      thesisDefenseDate: '',
      advisorLecturerGrade: '',
      committeePresidentGrade: '',
      committeeSecretaryGrade: '',
      criticalLecturerGrade: '',
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
      listSchedules: [],
      messages: '',
    };
  },
  computed: {
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('auth', [
      'token', 'userId',
    ]),
    ...mapGetters('topic', [
      'topicScheduleId',
    ]),
    isSave () {
      return this.section === 'topic_result-import';
    },
    isUpdate () {
      return this.section === 'topic_result-update';
    },
    isView () {
      return this.section === 'topic_result-view';
    },
    canUnregister () {
      const schedules = this.$store.state.schedule.listSchedules;
      if (this.scheduleId && this.listSchedules) {
        const schedule = schedules.find((sc) => sc._id.toString() === this.scheduleId.toString());

        const now = Date.now();
        const start = new Date(schedule.startRegisterDate);
        const end = new Date(schedule.endRegisterDate);
        return (start < now && now < end);
      }
      return false;
    },
  },
  async mounted () {
    await this.$store.dispatch('lecturer/fetchListLecturer', this.token);
    await this.$store.dispatch('student/fetchListStudent', this.token);
    await this.$store.dispatch('schedule/fetchListSchedules', this.token);
    const lecturers = this.$store.state.lecturer.listLecturer;
    const students = this.$store.state.student.listStudents;
    const schedules = this.$store.state.schedule.listSchedules;
    this.lecturerId = this.userId;
    this.scheduleId = this.topicScheduleId;
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
        label: student.name,
      };
      if (this.isView) {
        st = { ...st, disabled: true };
      }
      return st;
    });
    this.listSchedules = schedules.map((schedule) => {
      let st = {
        value: schedule._id,
        label: schedule.code,
      };
      if (this.isView) {
        st = { ...st, disabled: true };
      }
      return st;
    });
    if (this.isUpdate || this.isView) {
      const { id } = this.$store.state.url;
      await this.$store.dispatch('topic/fetchTopicById', { token: this.token, topicId: id });
      const { topic } = this.$store.state.topic;
      if (topic) {
        this.title = topic.title;
        this.code = topic.code;
        this.description = topic.description;
        this.limit = topic.limit;
        this.committeeId = topic.committeeId;
        if (topic.lecturerId) this.lecturerId = topic.lecturerId._id;
        if (topic.criticalLecturerId) this.criticalLecturerId = topic.criticalLecturerId._id;
        if (topic.scheduleId) this.scheduleId = topic.scheduleId._id;
        this.studentIds = topic.students;
        if (topic.thesisDefenseDate) {
          const date = new Date(topic.thesisDefenseDate);
          const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split('T')[0];
          this.thesisDefenseDate = dateString;
        }
        this.advisorLecturerGrade = topic.advisorLecturerGrade;
        this.committeePresidentGrade = topic.committeePresidentGrade;
        this.committeeSecretaryGrade = topic.committeeSecretaryGrade;
        this.criticalLecturerGrade = topic.criticalLecturerGrade;
      }
    }
  },
  methods: {
    async confirmRemove () {
      this.showConfirmModal = false;
      try {
        const value = {
          id: this.id,
          token: this.token,
        };
        await this.$store.dispatch('topic/removeRegisterTopicStudent', value);
        this.$toast.success('Đã xóa thành công!');
        this.rollBack();
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
      this.removeId = '';
    },
    rollBack () {
      this.$store.dispatch('url/updateSection', `${this.module}-list`);
    },
    async handleRemoveTopic () {
      this.removeId = this.id;
      this.showConfirmModal = true;
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>
