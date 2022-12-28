<!-- eslint-disable max-len -->
<template>
  <!-- component -->
  <div v-if="(isAuthenticated && userRole === 'LECTURER')">
    <div class="flex h-screen antialiased text-gray-900 bg-gray-100">
      <div class="flex flex-shrink-0 transition-all">
        <LeftMiniBarVue />
        <ManageBarLecturerVue v-if="page === 'management'" />
        <TaskBarScheduleVue v-if="page === 'task'" />
        <TaskBarTopicVue v-if="page === 'task'" />
      </div>
      <div class="flex grow flex-col overflow-x-clip">
        <HeaderBarVue
          v-if="page !== 'task'"
          :username="userName"
        />
        <MiniHeaderBarVue
          v-if="page === 'task'"
          :username="userName"
        />
        <div class="bg-white mx-4 border rounded overflow-scroll">
          <template v-if="page === 'management'">
            <template v-if="module === 'topic'">
              <ManageTopicLecturerVue v-if="section === 'topic-list'" />
              <FormTopicVue
                v-if="section === 'topic-update' || section === 'topic-import' || section === 'topic-view'"
              />
            </template>
            <!-- <template v-if="module === 'topic_proposal'">
              <ManageTopicProposalLecturerVue
                v-if="section === 'topic_proposal-list'"
                :open="isScheduleApprove"
              />
              <FormTopicProposalVue
                v-if="section === 'topic_proposal-update' || section === 'topic_proposal-import' || section === 'topic_proposal-view'"
              />
            </template> -->
            <template v-if="module === 'topic_proposal_approve'">
              <ManageApproveProposalLecturerVue
                v-if="section === 'topic_proposal_approve-list'"
                :open="isScheduleApprove"
              />
              <FormApproveProposalVue v-if="section === 'topic_proposal_approve-view' || section === 'topic_proposal_approve-update'" />
            </template>
            <template v-if="module === 'topic_advisor_approve'">
              <ManageTopicAdvisorLecturerVue
                v-if="section === 'topic_advisor_approve-list'"
              />
            </template>
            <template v-if="module === 'topic_critical_approve'">
              <ManageTopicCriticalLecturerVue
                v-if="section === 'topic_critical_approve-list'"
              />
            </template>
          </template>
          <template v-if="page === 'task'">
            <TaskDraggableVue />
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
import MiniHeaderBarVue from '../components/Lecturer/MiniHeaderBar.vue';
import ManageTopicLecturerVue from '../components/Lecturer/ManageTopicLecturer.vue';
// import ManageTopicProposalLecturerVue from '../components/Lecturer/ManageTopicProposalLecturer.vue';
import ManageApproveProposalLecturerVue from '../components/Lecturer/ManageApproveProposalLecturer.vue';
import ManageTopicAdvisorLecturerVue from '../components/Lecturer/ManageTopicAdvisorLecturer.vue';
import ManageTopicCriticalLecturerVue from '../components/Lecturer/ManageTopicCriticalLecturer.vue';
// import FormTopicProposalVue from '../components/Lecturer/FormTopicProposal.vue';
import FormTopicVue from '../components/Lecturer/FormTopic.vue';
import FormApproveProposalVue from '../components/Lecturer/FormApproveProposal.vue';
import TaskBarScheduleVue from '../components/Lecturer/TaskBarSchedule.vue';
import TaskBarTopicVue from '../components/Lecturer/TaskBarTopic.vue';
import TaskDraggableVue from '../components/Lecturer/TaskDraggable.vue';

export default {
  name: 'LecturerPage',
  components: {
    ErrorModalVue,
    LeftMiniBarVue,
    ManageBarLecturerVue,
    HeaderBarVue,
    MiniHeaderBarVue,
    ManageTopicLecturerVue,
    FormTopicVue,
    // ManageTopicProposalLecturerVue,
    // FormTopicProposalVue,
    ManageApproveProposalLecturerVue,
    FormApproveProposalVue,
    TaskBarScheduleVue,
    TaskBarTopicVue,
    TaskDraggableVue,
    ManageTopicAdvisorLecturerVue,
    ManageTopicCriticalLecturerVue,
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
      'page', 'module', 'subModule', 'section', 'id',
    ]),
    ...mapGetters('schedule', [
      'listScheduleApproveLecturer',
    ]),
    isScheduleApprove () {
      if (!this.listScheduleApproveLecturer || this.listScheduleApproveLecturer.length < 1) return false;
      return true;
    },
  },
  async mounted () {
    if (!this.isAuthenticated || this.userRole !== 'LECTURER') {
      this.showErrorModal = true;
    }
    const { page, module, section } = this.$store.state.url;
    if (!page && !module && !section) {
      this.$store.dispatch('url/updatePage', 'management');
      this.$store.dispatch('url/updateModule', 'topic');
      this.$store.dispatch('url/updateSubModule', 'topic');
      this.$store.dispatch('url/updateSection', 'topic-list');
    }
    await this.$store.dispatch('schedule/fetchListScheduleApproveLecturer', this.token);
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
