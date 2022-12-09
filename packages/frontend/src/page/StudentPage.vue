<!-- eslint-disable max-len -->
<template>
  <!-- component -->
  <div v-if="(isAuthenticated && userRole === 'STUDENT')">
    <div class="flex h-screen antialiased text-gray-900 bg-gray-100">
      <div class="flex flex-shrink-0 transition-all">
        <LeftMiniBarVue />
        <ManageBarStudentVue v-if="page === 'management'" />
      </div>
      <div class="flex grow flex-col">
        <HeaderBarVue :username="userName" />
        <div class="bg-white mx-4 border rounded h-full">
          <template v-if="module === 'topic'">
            <ManageTopicStudentVue v-if="section==='topic-list'" />
            <FormTopicVue v-if="section==='topic-view'" />
          </template>
          <template v-if="module === 'topic_proposal'">
            <ManageTopicProposalStudentVue v-if="section==='topic_proposal-list'" />
            <FormTopicProposalVue
              v-if="section === 'topic_proposal-update' || section === 'topic_proposal-import' || section === 'topic_proposal-view'"
            />
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
import FormTopicVue from '../components/Student/FormTopic.vue';
import FormTopicProposalVue from '../components/Student/FormTopicProposal.vue';
import HeaderBarVue from '../components/Admin/HeaderBar.vue';

export default {
  name: 'StudentPage',
  components: {
    ErrorModalVue,
    LeftMiniBarVue,
    ManageBarStudentVue,
    ManageTopicStudentVue,
    ManageTopicProposalStudentVue,
    FormTopicVue,
    HeaderBarVue,
    FormTopicProposalVue,
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
    if (!this.isAuthenticated || this.userRole !== 'STUDENT') {
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
