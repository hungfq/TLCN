<!-- eslint-disable max-len -->
<template>
  <!-- component -->
  <div v-if="(isAuthenticated && userRole === 'STUDENT')">
    <div class="flex h-screen antialiased text-gray-900 bg-gray-100">
      <div class="flex flex-shrink-0 transition-all">
        <LeftMiniBarVue />
        <ManageBarStudentVue v-if="page === 'management'" />
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
              <ManageTopicStudentVue
                v-if="section==='topic-list'"
                :open=" isScheduleRegister"
              />
              <FormTopicVue v-if="section==='topic-view'" />
            </template>
            <template v-if="module === 'topic_proposal'">
              <ManageTopicProposalStudentVue
                v-if="section==='topic_proposal-list'"
                :open=" isScheduleProposal"
              />
              <FormTopicProposalVue
                v-if="section === 'topic_proposal-update' || section === 'topic_proposal-import' || section === 'topic_proposal-view'"
              />
            </template>
            <template v-if="module === 'topic_result'">
              <ManageTopicResult
                v-if="section==='topic_result-list'"
              />
              <FormResultVue
                v-if="section === 'topic_result-view'"
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
import LeftMiniBarVue from '../components/Student/LeftMiniBar.vue';
import ManageBarStudentVue from '../components/Student/ManageBarStudent.vue';
import ManageTopicStudentVue from '../components/Student/ManageTopicStudent.vue';
import ManageTopicProposalStudentVue from '../components/Student/ManageTopicProposalStudent.vue';
import ManageTopicResult from '../components/Student/ManageTopicResult.vue';
import FormTopicVue from '../components/Student/FormTopic.vue';
import FormResultVue from '../components/Student/FormResult.vue';
import FormTopicProposalVue from '../components/Student/FormTopicProposal.vue';
import HeaderBarVue from '../components/Admin/HeaderBar.vue';
import MiniHeaderBarVue from '../components/Lecturer/MiniHeaderBar.vue';
import TaskDraggableVue from '../components/Lecturer/TaskDraggable.vue';
import TaskBarTopicVue from '../components/Student/TaskBarTopic.vue';

export default {
  name: 'StudentPage',
  components: {
    ErrorModalVue,
    LeftMiniBarVue,
    ManageBarStudentVue,
    ManageTopicStudentVue,
    ManageTopicProposalStudentVue,
    ManageTopicResult,
    FormTopicVue,
    HeaderBarVue,
    MiniHeaderBarVue,
    FormTopicProposalVue,
    FormResultVue,
    TaskDraggableVue,
    TaskBarTopicVue,
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
      'userId', 'userInfo', 'userRole', 'token', 'userName',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('schedule', [
      'listScheduleProposalStudent', 'listScheduleRegisterStudent',
    ]),
    isScheduleProposal () {
      if (!this.listScheduleProposalStudent || this.listScheduleProposalStudent.length < 1) return false;
      return true;
    },
    isScheduleRegister () {
      if (!this.listScheduleRegisterStudent || this.listScheduleRegisterStudent.length < 1) return false;
      return true;
    },
  },
  async mounted () {
    if (!this.isAuthenticated || this.userRole !== 'STUDENT') {
      this.showErrorModal = true;
    }
    const { page, module, section } = this.$store.state.url;
    if (!page && !module && !section) {
      this.$store.dispatch('url/updatePage', 'management');
      this.$store.dispatch('url/updateModule', 'topic');
      this.$store.dispatch('url/updateSection', 'topic-list');
    }
    await this.$store.dispatch('schedule/fetchListScheduleToday', this.token);
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
