<!-- eslint-disable max-len -->
<template>
  <!-- component -->
  <div v-if="(isAuthenticated && userRole === 'LECTURER')">
    <div class="flex h-screen antialiased text-gray-900 bg-gray-100">
      <div class="flex flex-shrink-0 transition-all">
        <LeftMiniBarVue />
        <ManageBarLecturerVue v-if="page === 'management'" />
      </div>
      <div class="flex grow flex-col">
        <HeaderBarVue :username="userName" />
        <div class="bg-white mx-4 border rounded h-full">
          <template v-if="page === 'management'">
            <template v-if="module === 'topic'">
              <ManageTopicLecturerVue v-if="section === 'topic-list'" />
              <FormTopicVue
                v-if="section === 'topic-update' || section === 'topic-import' || section === 'topic-view'"
              />
            </template>
            <template v-if="module === 'topic_proposal'">
              <ManageTopicProposalLecturerVue v-if="section === 'topic_proposal-list'" />
              <FormTopicProposalVue
                v-if="section === 'topic_proposal-update' || section === 'topic_proposal-import' || section === 'topic_proposal-view'"
              />
            </template>
          </template>
          <template v-if="module === 'topic_proposal_approve'">
            <ManageApproveProposalLecturerVue v-if="section === 'topic_proposal_approve-list'" />
            <FormApproveProposalVue v-if="section === 'topic_proposal_approve-view' || section === 'topic_proposal_approve-update'" />
          </template>
        </div>
      </div>
    </div>
  </div>

  <ErrorModalVue
    v-model="showErrorModal"
    :message="'Bạn không có quyền truy cập, vui lòng đăng nhập lại!'"
    @close-error="closeErrorModal"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ErrorModalVue from '../components/Modal/ErrorModal.vue';
import LeftMiniBarVue from '../components/Lecturer/LeftMiniBar.vue';
import ManageBarLecturerVue from '../components/Lecturer/ManageBarLecturer.vue';
import HeaderBarVue from '../components/Admin/HeaderBar.vue';
import ManageTopicLecturerVue from '../components/Lecturer/ManageTopicLecturer.vue';
import ManageTopicProposalLecturerVue from '../components/Lecturer/ManageTopicProposalLecturer.vue';
import ManageApproveProposalLecturerVue from '../components/Lecturer/ManageApproveProposalLecturer.vue';
import FormTopicProposalVue from '../components/Lecturer/FormTopicProposal.vue';
import FormTopicVue from '../components/Lecturer/FormTopic.vue';
import FormApproveProposalVue from '../components/Lecturer/FormApproveProposal.vue';

export default {
  name: 'LecturerPage',
  components: {
    ErrorModalVue,
    LeftMiniBarVue,
    ManageBarLecturerVue,
    HeaderBarVue,
    ManageTopicLecturerVue,
    FormTopicVue,
    ManageTopicProposalLecturerVue,
    FormTopicProposalVue,
    ManageApproveProposalLecturerVue,
    FormApproveProposalVue,
  },
  props: {
  },
  data () {
    return {
      showErrorModal: false,
      isSidebarOpen: true,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token', 'userName',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
  },
  async mounted () {
    if (!this.isAuthenticated || this.userRole !== 'LECTURER') {
      this.showErrorModal = true;
    }
    const { page, module, section } = this.$store.state.url;
    if (!page && !module && !section) {
      this.$store.dispatch('url/updatePage', 'management');
      this.$store.dispatch('url/updateModule', 'topic');
      this.$store.dispatch('url/updateSection', 'topic-list');
    }
  },
  async created () {
    const { _id } = this.$store.state.auth.userInfo;
    await this.$store.$socket.emit('login', _id);
  },
  methods: {
    closeErrorModal (close) {
      close();
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
