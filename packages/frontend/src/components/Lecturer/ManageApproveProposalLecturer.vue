<template>
  <template v-if="!open">
    <div class="py-2 mx-2 font-medium text-red-600 ">
      Hiện tại đang không có đợt duyệt đề tài, vui lòng chọn mục khác!
    </div>
  </template>
  <template v-else>
    <div class="flex">
      <div class="inline-block p-2 rounded-md">
        <select
          v-model="selectVal"
          class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          @change="selectHandler"
        >
          <option
            v-for="option in listScheduleApproveLecturer"
            :key="`key-${option._id}`"
            :value="option._id"
          >
            {{ option.code }} : {{ option.name }}
          </option>
        </select>
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
              Tên đề tài đề xuất
            </th>
            <th
              scope="col"
              class="py-3 px-6"
            >
              Mô tả
            </th>
            <th
              scope="col"
              class="py-3 px-6"
            >
              Người đề xuất
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
              {{ topic.title }}
            </th>
            <th
              :key="`topic-${topic._id}`"
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              {{ topic.description }}
            </th>
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              {{ `${topic.createdInfo.name} - ${topic.createdInfo.code}` }}
            </th>

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
                class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                @click="handleApproveTopic(topic._id)"
              >Gửi đề tài lên khoa</a>
              <a
                class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                @click="handleRemoveTopicProposal(topic._id)"
              >Từ chối</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
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
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
// Optionally import default styling
import 'vue-search-input/dist/styles.css';
import ConfirmModal from '../Modal/ConfirmModal.vue';

export default {
  name: 'ManageApproveProposalLecturer',
  components: {
    SearchInput,
    ConfirmModal,
  },
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      showConfirmModal: false,
      removeId: '',
      searchVal: '',
      topics: [],
      selectVal: '',
      canEdit: false,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('student', [
      'listStudents',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('topic_proposal', [
      'listTopicProposalByLecturer',
    ]),
    ...mapGetters('schedule', [
      'listScheduleApproveLecturer',
    ]),
    listTopicProposal () {
      const listTopics = this.listTopicProposalByLecturer.map((t) => {
        let user = this.listStudents.find((u) => u._id.toString() === t.createdBy.toString());
        if (!user) user = { name: '', code: '' };
        return { ...t, createdInfo: user };
      });
      return listTopics;
    },
  },
  async mounted () {
    await this.$store.dispatch('student/fetchListStudent', this.token);
    await this.$store.dispatch('schedule/fetchListScheduleApproveLecturer', this.token);
    this.topics = this.listTopicProposal;
    this.selectVal = this.listScheduleApproveLecturer[0] ? this.listScheduleApproveLecturer[0]._id : null;
    if (this.selectVal) {
      await this.$store.dispatch('topic_proposal/fetchListTopicProposalByLectures', { token: this.token, scheduleId: this.selectVal });
      this.$store.commit('schedule/setCurrentScheduleId', this.selectVal);
    }
    this.search();
  },
  methods: {
    async confirmRemove () {
      const id = this.removeId;
      this.showConfirmModal = false;
      try {
        const value = {
          id,
          token: this.token,
          scheduleId: this.selectVal,
        };
        await this.$store.commit('topic_proposal/setTopicScheduleId', this.selectVal);
        await this.$store.dispatch('topic_proposal/declineTopicProposal', value);
        await this.$store.dispatch('topic_proposal/fetchListTopicProposalByLectures', value);

        this.$toast.success('Đã từ chối hướng dẫn đề tài thành công!');
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
      this.removeId = '';
      this.search();
    },
    handleUpdateTopic (id) {
      this.$store.dispatch('url/updateSection', `${this.module}-update`);
      this.$store.dispatch('url/updateId', id);
    },
    handleShowTopic (id) {
      this.$store.dispatch('url/updateSection', `${this.module}-view`);
      this.$store.dispatch('url/updateId', id);
    },
    async handleRemoveTopicProposal (id) {
      this.removeId = id;
      this.showConfirmModal = true;
    },
    async handleApproveTopic (id) {
      try {
        const value = {
          id,
          token: this.token,
          scheduleId: this.selectVal,
        };
        await this.$store.dispatch('topic_proposal/approveTopicProposalByLecturer', value);
        await this.$store.dispatch('topic_proposal/fetchListTopicProposalByLectures', { token: this.token, scheduleId: this.selectVal });
        this.search();
        this.$toast.success('Đã từ gửi đề tài lên khoa thành công!');
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
    },
    displayLecturer (lecturer) {
      return lecturer ? lecturer.name : '';
    },
    search () {
      if (this.searchVal !== '') {
        const topicFilter = this.listTopicProposal.filter((topic) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (topic.title.match(re)) return true;
          if (topic.createdInfo) {
            if (topic.createdInfo.name.match(re)) return true;
            if (topic.createdInfo.code.match(re)) return true;
          }
          return false;
        });
        this.topics = topicFilter;
      } else this.topics = this.listTopicProposal;
    },
    async selectHandler () {
      await this.$store.commit('topic/setTopicScheduleId', this.selectVal);
      await this.$store.commit('topic_proposal/setTopicScheduleId', this.selectVal);
      await this.$store.dispatch('topic_proposal/fetchListTopicProposalByLectures', { token: this.token, scheduleId: this.selectVal });
      this.$store.commit('schedule/setCurrentScheduleId', this.selectVal);
      this.search();
    },
  },
};
</script>
