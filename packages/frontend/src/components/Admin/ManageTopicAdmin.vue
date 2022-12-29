<template>
  <div class="flex">
    <div class="inline-block p-2 rounded-md">
      <select
        v-model="selectSchedule"
        class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        @change="selectHandler"
      >
        <option
          :key="`key-null`"
          :value="''"
        >
          Tất cả
        </option>
        <option
          v-for="option in listSchedules"
          :key="`key-${option._id}`"
          :value="option._id"
        >
          {{ option.code }} : {{ option.name }}
        </option>
      </select>
    </div>
    <div class="inline-block p-2 rounded-md">
      <select
        v-model="selectLecturer"
        class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        @change="selectHandler"
      >
        <option
          :key="`key-null`"
          :value="''"
        >
          Tất cả
        </option>
        <option
          v-for="option in listLecturer"
          :key="`key-${option._id}`"
          :value="option._id"
        >
          {{ option.code }} : {{ option.name }}
        </option>
      </select>
    </div>
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      @click="$store.dispatch('url/updateSection', 'topic-import')"
    >
      Thêm đề tài
    </div>
    <UploadButtonVue @uploadFileExcel="upload" />
    <div class="flex items-center justify-center mr-4">
      <a
        class=" rounded ml-auto mr-4 my-2 bg-gray-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
        href="http://localhost:5000/template/Topic"
      >Tải mẫu tệp excel</a>
    </div>
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
            Mã đề tài
          </th>
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
            Giảng viên hướng dẫn
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Giảng viên phản biện
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
            {{ topic.code }}
          </th>
          <th
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.title }}
          </th>
          <td class="py-4 px-6">
            <div class="font-bold cursor-pointer">
              {{ displayLecturer(topic.lecturerId) }}
            </div>
          </td>
          <td class="py-4 px-6">
            <div class="font-bold cursor-pointer">
              {{ displayLecturer(topic.criticalLecturerId) }}
            </div>
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateTopic(topic._id)"
            >Sửa</a>
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowTopic(topic._id)"
            >Xem chi tiết</a>
            <a
              class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
              @click="handleRemoveTopic(topic._id)"
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
    <div>Bạn có xác nhận xóa đề tài này không?</div>
  </ConfirmModal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
// Optionally import default styling
import 'vue-search-input/dist/styles.css';
import ConfirmModal from '../Modal/ConfirmModal.vue';
import UploadButtonVue from './UploadButton.vue';

export default {
  name: 'ManageTopicAdmin',
  components: {
    SearchInput,
    ConfirmModal,
    UploadButtonVue,
  },
  data () {
    return {
      selectSchedule: '',
      selectLecturer: '',
      showConfirmModal: false,
      removeId: '',
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
      'listTopicsByLecturerSchedule',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('schedule', [
      'listSchedules',
    ]),
    ...mapGetters('lecturer', [
      'listLecturer',
    ]),
  },
  async mounted () {
    await this.$store.dispatch('topic/fetchListTopicByLecturerSchedule', { token: this.token, lecturerId: this.selectLecturer, scheduleId: this.selectSchedule });
    this.topics = this.listTopicsByLecturerSchedule;
    await this.$store.dispatch('schedule/fetchListSchedules', this.token);
  },
  methods: {
    async confirmRemove () {
      const id = this.removeId;
      this.showConfirmModal = false;
      try {
        const value = {
          id,
          token: this.token,
        };
        await this.$store.dispatch('topic/removeTopic', value);
        this.$toast.success('Đã xóa thành công!');
        await this.$store.dispatch('topic/fetchListTopicByLecturerSchedule', { token: this.token, lecturerId: this.selectLecturer, scheduleId: this.selectSchedule });
        this.search();
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
      this.removeId = '';
    },
    handleUpdateTopic (id) {
      this.$store.dispatch('url/updateSection', `${this.module}-update`);
      this.$store.dispatch('url/updateId', id);
    },
    handleShowTopic (id) {
      this.$store.dispatch('url/updateSection', `${this.module}-view`);
      this.$store.dispatch('url/updateId', id);
    },
    async handleRemoveTopic (id) {
      this.removeId = id;
      this.showConfirmModal = true;
    },
    displayLecturer (lecturer) {
      return lecturer ? lecturer.name : '';
    },
    async upload (files) {
      if (files.length > 0) {
        await this.$store.dispatch('topic/importTopic', { token: this.token, xlsx: files[0] })
          .then((data) => {
            if (data.status === 201) {
              this.$toast.success('Đã nhập thành công!');
            }
          });
        await this.$store.dispatch('topic/fetchListTopicByLecturerSchedule', { token: this.token, lecturerId: this.selectLecturer, scheduleId: this.selectSchedule });
        this.search();
      } else {
        this.$toast.error('File không tồn tại');
      }
    },
    search () {
      if (this.searchVal !== '') {
        const topicFilter = this.listTopicsByLecturerSchedule.filter((topic) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (topic.title.match(re)) return true;
          if (topic.code.match(re)) return true;
          if (!topic.lecturerId) return false;
          if (topic.lecturerId.name.match(re)) return true;
          return false;
        });

        this.topics = topicFilter;
      } else this.topics = this.listTopicsByLecturerSchedule;
    },
    handleNewButtonClick () {
      this.$refs.submitBtn.click();
    },
    async selectHandler () {
      await this.$store.dispatch('topic/fetchListTopicByLecturerSchedule', { token: this.token, lecturerId: this.selectLecturer, scheduleId: this.selectSchedule });
      this.topics = this.listTopicsByLecturerSchedule;
    },
  },
};
</script>
