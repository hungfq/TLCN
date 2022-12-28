<!-- eslint-disable max-len -->
<template>
  <!-- component -->
  <div v-if="(isAuthenticated && userRole === 'ADMIN')">
    <div class="flex h-screen antialiased text-gray-900 bg-gray-100">
      <div class="flex flex-shrink-0 transition-all">
        <LeftMiniBarVue />
        <ManageBarVue />
      </div>
      <div class="flex grow flex-col">
        <HeaderBarVue :username="userName" />
        <div class="bg-white mx-4 border rounded overflow-scroll">
          <template v-if="module === 'student'">
            <ManageStudentAdminVue v-if="section === 'student-list'" />
            <FormUserVue
              v-if="section === 'student-update' || section === 'student-import' || section === 'student-view'"
            />
          </template>
          <template v-if="module === 'lecturer'">
            <ManageLecturerAdminVue v-if="section === 'lecturer-list'" />
            <FormUserVue
              v-if="section === 'lecturer-update' || section === 'lecturer-import' || section === 'lecturer-view'"
            />
          </template>
          <template v-if="module === 'admin'">
            <ManageAdminVue v-if="section === 'admin-list'" />
            <FormUserVue v-if="section === 'admin-update' || section === 'admin-import' || section === 'admin-view'" />
          </template>
          <template v-if="module === 'topic'">
            <ManageTopicAdminVue v-if="section === 'topic-list'" />
            <FormTopicVue v-if="section === 'topic-update' || section === 'topic-import' || section === 'topic-view'" />
          </template>
          <template v-if="module === 'schedule'">
            <ManageScheduleAdminVue v-if="section === 'schedule-list'" />
            <FormScheduleVue v-if="section === 'schedule-update' || section === 'schedule-import' || section === 'schedule-view'" />
          </template>
          <template v-if="module === 'topic_proposal'">
            <ManageApproveProposalAdminVue v-if="section === 'topic_proposal-list'" />
            <FormApproveVue v-if="section === 'topic_proposal-update' || section === 'topic_proposal-view'" />
          </template>
          <template v-if="module === 'committee'">
            <ManageCommitteeAdminVue v-if="section === 'committee-list'" />
            <FormCommitteeVue v-if="section === 'committee-update' || section === 'committee-import' || section === 'committee-view'" />
            <FormTopicCommitteeVue v-if="section === 'committee-add-topic'" />
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
import LeftMiniBarVue from '../components/Admin/LeftMiniBar.vue';
import ManageBarVue from '../components/Admin/ManageBar.vue';
import HeaderBarVue from '../components/Admin/HeaderBar.vue';
import ManageStudentAdminVue from '../components/Admin/ManageStudentAdmin.vue';
import ManageLecturerAdminVue from '../components/Admin/ManageLecturerAdmin.vue';
import ManageAdminVue from '../components/Admin/ManageAdmin.vue';
import ManageTopicAdminVue from '../components/Admin/ManageTopicAdmin.vue';
import ManageScheduleAdminVue from '../components/Admin/ManageScheduleAdmin.vue';
import ManageApproveProposalAdminVue from '../components/Admin/ManageApproveProposalAdmin.vue';
import ManageCommitteeAdminVue from '../components/Admin/ManageCommitteeAdmin.vue';
import FormUserVue from '../components/Admin/FormUser.vue';
import FormTopicVue from '../components/Admin/FormTopic.vue';
import FormScheduleVue from '../components/Admin/FormSchedule.vue';
import FormApproveVue from '../components/Admin/FormApprove.vue';
import FormCommitteeVue from '../components/Admin/FormCommittee.vue';
import FormTopicCommitteeVue from '../components/Admin/FormTopicCommittee.vue';

export default {
  name: 'AdminPage',
  components: {
    ErrorModalVue,
    LeftMiniBarVue,
    ManageBarVue,
    HeaderBarVue,
    ManageStudentAdminVue,
    FormUserVue,
    ManageLecturerAdminVue,
    ManageAdminVue,
    ManageTopicAdminVue,
    FormTopicVue,
    ManageScheduleAdminVue,
    ManageApproveProposalAdminVue,
    FormScheduleVue,
    FormApproveVue,
    ManageCommitteeAdminVue,
    FormCommitteeVue,
    FormTopicCommitteeVue,
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
    if (!this.isAuthenticated || this.userRole !== 'ADMIN') {
      this.showErrorModal = true;
    }
    const { page, module, section } = this.$store.state.url;
    if (!page && !module && !section) {
      this.$store.dispatch('url/updatePage', 'management');
      this.$store.dispatch('url/updateModule', 'student');
      this.$store.dispatch('url/updateSection', 'student-list');
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
