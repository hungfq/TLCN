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
            Mã đề tài
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên đề tài hướng dẫn
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Đợt đăng kí
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
          <td
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.code }}
          </td>
          <td
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.title }}
          </td>
          <td
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.scheduleId.name }}
          </td>

          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleApproveTopic(topic._id)"
            >Phê duyệt</a>
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
    <div>Bạn sẽ xóa  đúng không?</div>
  </ConfirmModal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
// Optionally import default styling
import 'vue-search-input/dist/styles.css';
import ConfirmModal from '../Modal/ConfirmModal.vue';
import TopicApi from '../../utils/api/topic';

export default {
  name: 'ManageTopicAdvisorLecturer',
  components: {
    SearchInput,
    ConfirmModal,
  },
  props: {
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
      const listTopics = this.topics.map((t) => {
        const listStudents = t.students.map((s) => this.listStudents.find((st) => st.code.toString() === s.toString()));
        return {
          ...t, studentInfo: listStudents,
        };
      });
      return listTopics;
    },
  },
  async mounted () {
    await this.$store.dispatch('student/fetchListStudent', this.token);
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
        await this.$store.dispatch('topic_proposal/removeTopicProposal', value);
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
        await TopicApi.topicAdvisorApprove(this.token, id);
        this.$toast.success('Đã phê duyệt đề tài ra hội đồng thành công!');

        this.search();
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
    },
    displayLecturer (lecturer) {
      return lecturer ? lecturer.name : '';
    },
    async search () {
      const list = await TopicApi.listTopicAdvisorApprove(this.token);
      if (this.searchVal !== '') {
        const topicFilter = list.filter((topic) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (topic.code.match(re)) return true;
          if (topic.title.match(re)) return true;
          return false;
        });
        this.topics = topicFilter;
      } else this.topics = list;
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
