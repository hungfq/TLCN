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
          validation="min:1"
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
          v-model="startDate"
          name="startDate"
          type="date"
          label="Thời hạn bắt đầu"
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
        <div class="w-3/4">
          <span class="font-bold text-sm">
            Giáo viên phản biện
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="committee.criticalLecturerId"
              :options="listLecturers"
              :searchable="true"
              :disabled="true"
            />
          </div>
        </div>
        <div class="w-3/4">
          <span class="font-bold text-sm">
            Chủ tịch hội đồng
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="committee.committeePresidentId"
              :options="listLecturers"
              :searchable="true"
              :disabled="true"
            />
          </div>
        </div>
        <div class="w-3/4">
          <span class="font-bold text-sm">
            Thư kí hội đồng
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="committee.committeeSecretaryId"
              :options="listLecturers"
              :searchable="true"
              :disabled="true"
            />
          </div>
        </div>
        <FormKit
          v-model="advisorLecturerGrade"
          name="limit"
          type="number"
          label="Điểm của giảng viên hướng dẫn"
          :disabled="true"
        />
        <FormKit
          v-model="criticalLecturerGrade"
          name="criticalLecturerGrade"
          type="number"
          label="Điểm của giảng viên phản biện"
          :disabled="true"
        />
        <FormKit
          v-model="committeePresidentGrade"
          name="committeePresidentGrade"
          type="number"
          label="Điểm của chủ tịch hội đồng"
          :disabled="true"
        />
        <FormKit
          v-model="committeeSecretaryGrade"
          name="committeeSecretaryGrade"
          type="number"
          label="Điểm của thư ký"
          :disabled="true"
        />
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
        <button
          v-if="isPermit && isScheduleRegister"
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
import { getValidationMessages } from '@formkit/validation';
import { mapState, mapGetters } from 'vuex';
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
      removeId: '',
      id: '',
      title: '',
      code: '',
      description: '',
      limit: '',
      deadline: '',
      lecturerId: '',
      major: '',
      studentIds: [],
      startDate: '',
      committeeId: '',
      committee: {
        committeePresidentId: '',
        committeeSecretaryId: '',
        criticalLecturerId: '',
      },
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
      'listSchedules', 'isScheduleRegister', 'isPermit',
    ]),
    ...mapGetters('committee', [
      'listCommittee',
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
    await this.$store.dispatch('committee/fetchListCommittee', this.token);
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
      if (topic.startDate) {
        const date = new Date(topic.startDate);
        const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0];
        this.startDate = dateString;
      }
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
      if (topic.committeeId) {
        const committee = this.listCommittee.find((c) => c._id.toString() === topic.committeeId.toString());
        const {
          committeePresidentId,
          committeeSecretaryId,
          criticalLecturerId,
        } = committee;
        this.committee.committeePresidentId = committeePresidentId ? committeePresidentId._id : '';
        this.committee.committeeSecretaryId = committeeSecretaryId ? committeeSecretaryId._id : '';
        this.committee.criticalLecturerId = criticalLecturerId ? criticalLecturerId._id : '';
      }
    }
  },
  methods: {
    async confirmRemove () {
      const id = this.removeId;
      this.showConfirmModal = false;
      try {
        const value = {
          id: this.id,
          token: this.token,
        };
        await this.$store.dispatch('topic/removeRegisterTopicStudent', value);
        this.$toast.success('Đã xóa thành công!');
        this.topic = null;
        this.$store.dispatch('topic/fetchListTopicByStudent', this.token);
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
      this.removeId = '';
      this.search();
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
