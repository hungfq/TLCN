<template>
  <div class="flex">
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      @click="$store.dispatch('url/updateSection', 'schedule-import')"
    >
      Thêm đợt đăng ký
    </div>
    <form
      class="flex"
      @submit.prevent="upload"
    >
      <input
        id="upload123"
        ref="uploadBtn"
        class="hidden"
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        @change="handleNewButtonClick"
      >
      <label
        ref="labelBtn"
        class="hidden"
        for="upload123"
      >ss</label>
      <button
        ref="submitBtn"
        type="submit"
        class="hidden"
      >
        student
      </button>
    </form>
  </div>
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
            Mã đợt đăng ký
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên đợt đăng ký
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Thời gian bắt đầu
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Thời gian kết thúc
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            <a
              class="rounded bg-gray-800 text-white font-sans font-semibold cursor-pointer p-2"
              href="http://localhost:5000/template/User"
            >Tải mẫu nhập sinh viên</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="schedule in schedules"
          :key="`schedule-${schedule._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <td
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ schedule.code }}
          </td>
          <td
            :key="`schedule-${schedule._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ schedule.name }}
          </td>
          <td class="py-4 px-6">
            <div class="font-bold cursor-pointer">
              {{ formatDay(schedule.startProposalDate) }}
            </div>
          </td>
          <td class="py-4 px-6">
            <div class="font-bold cursor-pointer">
              {{ formatDay(schedule.endRegisterDate) }}
            </div>
          </td>
          <td class="py-4 text-right">
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleClickStudent(schedule._id)"
            >Nhập sinh viên bằng file excel</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              :href="getLink(schedule._id)"
            >Xuất báo cáo</a>
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowSchedule(schedule._id)"
            >Xem chi tiết</a>
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateSchedule(schedule._id)"
            >Sửa</a>
            <a
              class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
              @click="handleRemoveSchedule(schedule._id)"
            >Xóa</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ConfirmModal
    v-model="showConfirmModal"
    @confirm="confirmRemove"
    @cancel="showConfirmModal=false"
  >
    <template #title>
      Xác nhận
    </template>
    <div>Bạn có xác nhận xóa đợt đăng ký này không?</div>
  </ConfirmModal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
// Optionally import default styling
import 'vue-search-input/dist/styles.css';
import ConfirmModal from '../Modal/ConfirmModal.vue';
// import UploadButtonVue from './UploadButton.vue';

export default {
  name: 'ManageScheduleAdmin',
  components: {
    SearchInput,
    ConfirmModal,
  },
  data () {
    return {
      showConfirmModal: false,
      removeId: '',
      schedules: [],
      searchVal: '',
      importType: '',
      importId: '',
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('schedule', [
      'listSchedules',
    ]),
  },
  async mounted () {
    await this.$store.dispatch('schedule/fetchListSchedules', this.token);
    this.schedules = this.listSchedules;
  },
  methods: {
    handleClickStudent (id) {
      this.importId = id;
      this.importType = 'student';
      this.$refs.labelBtn.click();
    },
    handleClickTopic (id) {
      this.importId = id;
      this.importType = 'topic';
      this.$refs.labelBtn.click();
    },
    handleNewButtonClick () {
      this.$refs.submitBtn.click();
    },
    async upload () {
      const { files } = this.$refs.uploadBtn;
      if (files.length > 0) {
        if (this.importType === 'student') {
          await this.$store.dispatch('schedule/importStudent', { token: this.token, id: this.importId, xlsx: files[0] })
            .then((data) => {
              if (data.status === 201) {
                this.$toast.success('Đã nhập thành công!');
              }
            });
        } else if (this.importType === 'topic') {
          await this.$store.dispatch('schedule/importTopic', { token: this.token, id: this.importId, xlsx: files[0] })
            .then((data) => {
              if (data.status === 201) {
                this.$toast.success('Đã nhập thành công!');
              }
            });
        }
        this.importId = '';
        this.importType = '';
        this.$refs.uploadBtn.value = '';
        this.search();
      } else {
        this.$toast.error('File không tồn tại');
      }
    },

    async confirmRemove () {
      const id = this.removeId;
      this.showConfirmModal = false;
      try {
        const value = {
          id,
          token: this.token,
        };
        await this.$store.dispatch('schedule/removeSchedule', value);
        this.$toast.success('Đã xóa thành công!');
        this.search();
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
      this.removeId = '';
    },
    async handleUpdateSchedule (id) {
      await this.$store.dispatch('url/updateSection', 'schedule-update');
      await this.$store.dispatch('url/updateId', id);
    },
    getLink (id) {
      return `http://localhost:5000/v1/schedule/${id}/export`;
    },
    // async handleExportSchedule (id) {
    //   await this.$store.dispatch('schedule/exportExcel', { token: this.token, id });
    // },
    async handleShowSchedule (id) {
      await this.$store.dispatch('url/updateSection', 'schedule-view');
      await this.$store.dispatch('url/updateId', id);
    },
    async handleRemoveSchedule (id) {
      this.removeId = id;
      this.showConfirmModal = true;
    },
    formatDay (oldDate) {
      try {
        if (!oldDate || oldDate === '') {
          return '';
        }
        const newDate = new Date(oldDate);
        const dateString = new Date(newDate.getTime() - (newDate.getTimezoneOffset() * 60000))
          .toISOString()
          .split('T')[0];
        return dateString;
      } catch (e) {
        return '';
      }
    },
    search () {
      if (this.searchVal !== '') {
        const scheduleFilter = this.listSchedules.filter((schedule) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          const startDate = this.formatDay(schedule.startDate);
          const endDate = this.formatDay(schedule.endDate);
          if (schedule.name.match(re)) return true;
          if (schedule.code.match(re)) return true;
          if (endDate.match(re)) return true;
          if (startDate.match(re)) return true;
          return false;
        });
        this.schedules = scheduleFilter;
      } else this.schedules = this.listSchedules;
    },
  },
};
</script>
