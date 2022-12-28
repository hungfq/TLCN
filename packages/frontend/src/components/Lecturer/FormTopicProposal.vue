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
          Thông tin đề tài
        </h3>
      </div>
      <div class="ml-5 grid grid-cols-2">
        <FormKit
          v-model="title"
          type="text"
          name="title"
          label="Tiêu đề"
          help="Vd: Xây dụng web thương mại điện tử e-shop"
          validation="required"
          :disabled="isView"
        />
        <FormKit
          v-model="description"
          name="description"
          type="textarea"
          label="Mô tả"
          help="Ghi các thông tin chi tiết tại đây"
          validation="required"
          :disabled="isView"
        />
        <FormKit
          v-model="limit"
          name="limit"
          type="number"
          label="Số thành viên"
          validation="min:1|max:3"
          :disabled="isView"
        />
        <FormKit
          v-model="major"
          name="major"
          type="text"
          label="Chuyên ngành"
          validation="required"
          :disabled="isView"
        />
        <FormKit
          v-model="deadline"
          name="deadline"
          type="date"
          label="Thời hạn hoàn thành"
          validation="required"
          :disabled="isView"
        />
        <div
          v-show="false"
          class="w-3/4"
        >
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
          v-if="!isView"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleAddTopicAdmin"
        >
          {{ isSave ? 'Lưu' : 'Cập nhật' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { getValidationMessages } from '@formkit/validation';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'FormTopicProposal',
  components: {
    Multiselect,
  },
  props: {
  },
  data () {
    return {
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
    };
  },
  computed: {
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('auth', [
      'token', 'userId',
    ]),
    isSave () {
      return this.section === 'topic_proposal-import';
    },
    isUpdate () {
      return this.section === 'topic_proposal-update';
    },
    isView () {
      return this.section === 'topic_proposal-view';
    },
  },
  async mounted () {
    await this.$store.dispatch('lecturer/fetchListLecturer', this.token);
    await this.$store.dispatch('student/fetchListStudent', this.token);
    const lecturers = this.$store.state.lecturer.listLecturer;
    const students = this.$store.state.student.listStudents;
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
    if (this.isUpdate || this.isView) {
      const { id } = this.$store.state.url;
      const { listTopicProposalCreated } = this.$store.state.topic_proposal;
      const topic = listTopicProposalCreated.find((s) => s._id.toString() === id.toString());
      if (topic) {
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
        if (topic.lecturerId) this.lecturerId = topic.lecturerId._id;
        this.major = topic.major;
        this.studentIds = topic.students;
      }
    }
  },
  methods: {
    rollBack () {
      this.$store.dispatch('url/updateSection', `${this.module}-list`);
    },
    async handleAddTopicAdmin () {
      const { studentIds } = this;
      const value = {
        title: this.title,
        limit: this.limit,
        description: this.description,
        deadline: this.deadline,
        major: this.major,
        students: studentIds,
        lecturerId: this.userId,
      };
      try {
        if (this.isSave) {
          await this.$store.dispatch('topic_proposal/addTopicProposal', { token: this.token, value });
        } else if (this.isUpdate) {
          await this.$store.dispatch('topic_proposal/updateTopicProposal', { token: this.token, value: { ...value, _id: this.id } });
        }
        this.$toast.success('Đã cập nhật một thành công!');
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      } finally {
        this.rollBack();
      }
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>
