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
          v-model="name"
          type="text"
          name="name"
          label="Tên hội đồng"
          validation="required"
          :disabled="isView"
        />
        <FormKit
          v-model="code"
          name="code"
          type="text"
          label="Mã hội đồng"
          validation="required"
          :disabled="isView"
        />
        <div class="w-3/4">
          <span class="font-bold text-sm">
            Giáo viên phản biện
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="criticalLecturerId"
              :options="listLecturers"
              :searchable="true"
              :disabled="isView"
            />
          </div>
        </div>
        <div class="w-3/4">
          <span class="font-bold text-sm">
            Chủ tịch hội đồng
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="committeePresidentId"
              :options="listLecturers"
              :searchable="true"
              :disabled="isView"
            />
          </div>
        </div>
        <div class="w-3/4">
          <span class="font-bold text-sm">
            Thư kí hội đồng
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="committeeSecretaryId"
              :options="listLecturers"
              :searchable="true"
              :disabled="isView"
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
import { mapGetters } from 'vuex';

export default {
  name: 'FormTopic',
  components: {
    Multiselect,
  },
  props: {
  },
  data () {
    return {
      code: '',
      name: '',
      committeePresidentId: '',
      committeeSecretaryId: '',
      criticalLecturerId: '',
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
      'token',
    ]),
    isSave () {
      return this.section === 'committee-import';
    },
    isUpdate () {
      return this.section === 'committee-update';
    },
    isView () {
      return this.section === 'committee-view';
    },
  },
  async mounted () {
    await this.$store.dispatch('committee/fetchListCommittee', this.token);
    await this.$store.dispatch('lecturer/fetchListLecturer', this.token);
    const lecturers = this.$store.state.lecturer.listLecturer;
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

    if (this.isUpdate || this.isView) {
      const { id } = this.$store.state.url;
      const { listCommittee } = this.$store.state.committee;
      const committee = listCommittee.find((s) => s._id.toString() === id.toString());
      if (committee) {
        this.name = committee.name;
        this.code = committee.code;
        this.committeePresidentId = committee.committeePresidentId._id;
        this.committeeSecretaryId = committee.committeeSecretaryId._id;
        this.criticalLecturerId = committee.criticalLecturerId._id;
      }
    }
  },
  methods: {
    rollBack () {
      this.$store.dispatch('url/updateSection', `${this.module}-list`);
    },
    async handleAddTopicAdmin () {
      const value = {
        name: this.name,
        code: this.code,
        committeePresidentId: this.committeePresidentId,
        committeeSecretaryId: this.committeeSecretaryId,
        criticalLecturerId: this.criticalLecturerId,
      };
      try {
        if (this.check()) {
          if (this.isSave) {
            await this.$store.dispatch('committee/addCommittee', { token: this.token, value });
            this.$toast.success('Đã thêm thành công!');
            this.rollBack();
          } else if (this.isUpdate) {
            await this.$store.dispatch('committee/updateCommittee', { token: this.token, value: { ...value, id: this.id, type: 'UPDATE_INFO' } });
            this.$toast.success('Đã cập nhật thành công!');
            this.rollBack();
          }
        }
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
    },
    check () {
      if (!this.name) {
        this.$toast.error('Vui lòng nhập tên hội đồng');
        return false;
      }
      if (!this.code) {
        this.$toast.error('Vui lòng nhập mã hội đồng');
        return false;
      }
      if (!this.committeePresidentId) {
        this.$toast.error('Vui lòng chọn chủ tịch hội đồng');
        return false;
      }
      if (!this.committeeSecretaryId) {
        this.$toast.error('Vui lòng chọn thư ký hội đồng');
        return false;
      }
      if (!this.criticalLecturerId) {
        this.$toast.error('Vui lòng chọn giảng viên phản biện');
        return false;
      }
      return true;
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>
