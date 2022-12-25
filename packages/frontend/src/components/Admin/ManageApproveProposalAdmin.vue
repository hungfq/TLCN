<template>
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
          v-for="topic in topicProposals"
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
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ `${topic.createdInfo.name} - ${topic.createdInfo.code}` }}
          </th>

          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateTopic(topic._id)"
            >Duyệt đề tài</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowTopic(topic._id)"
            >Xem chi tiết</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleRemoveTopicProposal(topic._id)"
            >Từ chối</a>
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
    <div>Bạn sẽ từ chối đề tài đúng không?</div>
  </ConfirmModal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
// Optionally import default styling
import 'vue-search-input/dist/styles.css';
import ConfirmModal from '../Modal/ConfirmModal.vue';

export default {
  name: 'ManageApproveProposalAdmin',
  components: {
    SearchInput,
    ConfirmModal,
  },
  data () {
    return {
      showConfirmModal: false,
      removeId: '',
      searchVal: '',
      topicProposals: [],
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
    ...mapGetters('lecturer', [
      'listLecturer',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('topic_proposal', [
      'listTopicProposalAdmin',
    ]),
    listTopicProposal () {
      const listTopics = this.listTopicProposalAdmin.map((t) => {
        let user = this.listStudents.find((u) => u._id.toString() === t.createdBy.toString());
        if (user) {
          const newUser = { ...user };
          newUser.name = `SV: ${user.name}`;
          return { ...t, createdInfo: newUser };
        }
        user = this.listLecturer.find((u) => u._id.toString() === t.createdBy.toString());
        if (user) {
          const newUser = { ...user };
          newUser.name = `GV: ${user.name}`;
          return { ...t, createdInfo: newUser };
        }

        if (!user) user = { name: '', code: '' };
        return { ...t, createdInfo: user };
      });
      return listTopics;
    },
  },
  async mounted () {
    await this.$store.dispatch('topic_proposal/fetchListTopicProposalAdmin', this.token);
    await this.$store.dispatch('student/fetchListStudent', this.token);
    await this.$store.dispatch('lecturer/fetchListLecturer', this.token);
    this.topicProposals = this.listTopicProposal;
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
        await this.$store.dispatch('topic_proposal/removeTopicProposal', value);
        this.$toast.success('Đã từ chối hướng dẫn đề tài thành công!');
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
    async handleRemoveTopicProposal (id) {
      this.removeId = id;
      this.showConfirmModal = true;
    },
    async handleApproveTopic (id) {
      try {
        const value = {
          id,
          token: this.token,
        };
        await this.$store.dispatch('topic_proposal/approveTopicProposalByLecturer', value);
        await this.$store.dispatch('topic_proposal/fetchListTopicProposalByLectures', this.token);

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
          if (topic.createdInfo.name.match(re)) return true;
          if (topic.createdInfo.code.match(re)) return true;
          return false;
        });
        this.topicProposals = topicFilter;
      } else this.topicProposals = this.listTopicProposal;
    },
  },
};
</script>
