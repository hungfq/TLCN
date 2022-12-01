<template>
  <div class="flex">
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      @click="$store.dispatch('url/updateSection', 'schedule-import')"
    >
      Thêm đợt đăng ký
    </div>
    <form
      class="flex items-center justify-center"
      @submit.prevent="upload"
    >
      <input
        ref="uploadBtn"
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      >
      <button type="submit">
        Tải lên tệp excel
      </button>
    </form>
  </div>
  <div class="shadow-md sm:rounded-lg m-4">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-300">
        <tr>
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
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="schedule in listSchedules"
          :key="`schedule-${schedule._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`schedule-${schedule._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ schedule.name }}
          </th>
          <td class="py-4 px-6">
            <div class="font-bold cursor-pointer">
              {{ formatDay(schedule.startDate) }}
            </div>
          </td>
          <td class="py-4 px-6">
            <div class="font-bold cursor-pointer">
              {{ formatDay(schedule.endDate) }}
            </div>
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateSchedule(schedule._id)"
            >Sửa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleRemoveSchedule(schedule._id)"
            >Xóa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowSchedule(schedule._id)"
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
  name: 'ManageScheduleAdmin',
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
    ...mapGetters('schedule', [
      'listSchedules',
    ]),
  },
  mounted () {
    this.$store.dispatch('schedule/fetchListSchedules', this.token);
  },
  methods: {
    handleUpdateSchedule (id) {
      this.$store.dispatch('url/updateSection', 'schedule-update');
      this.$store.dispatch('url/updateId', id);
    },
    handleShowSchedule (id) {
      this.$store.dispatch('url/updateSection', 'schedule-view');
      this.$store.dispatch('url/updateId', id);
    },
    async handleRemoveSchedule (id) {
      try {
        const value = {
          id,
          token: this.token,
        };
        await this.$store.dispatch('schedule/removeSchedule', value);
        this.$toast.success('Đã xóa thành công!');
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
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
  },
};
</script>
