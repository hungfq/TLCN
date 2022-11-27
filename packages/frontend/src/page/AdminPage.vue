<!-- eslint-disable max-len -->
<template>
  <!-- component -->
  <div v-if="isAuthenticated">
    <div class="flex h-screen antialiased text-gray-900 bg-gray-100">
      <div class="flex flex-shrink-0 transition-all">
        <LeftMiniBarVue />
        <ManageBarVue />
      </div>
      <div class="flex grow flex-col">
        <HeaderBarVue :username="userName" />
        <div class="bg-white mx-4 border rounded h-full">
          <ManageStudentAdminVue v-if="section === 'student-list'" />
          <FormUserVue v-if="section === 'student-update'|| section === 'student-import' || section === 'student-view'" />
        </div>
      </div>
    </div>
  </div>
  <ErrorModalVue
    v-model="showErrorModal"
    :message="'Bạn chưa đăng nhập, vui lòng đăng nhập lại'"
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
import FormUserVue from '../components/Admin/FormUser.vue';

export default {
  name: 'AdminPage',
  components: {
    ErrorModalVue,
    LeftMiniBarVue,
    ManageBarVue,
    HeaderBarVue,
    ManageStudentAdminVue,
    FormUserVue,
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
    typeForm () {
      if (this.section === 'student-update') return 'update';
      if (this.section === 'student-import') return 'import';
      return 'view';
    },
  },
  async mounted () {
    if (!this.isAuthenticated) {
      this.showErrorModal = true;
    }
    const { page, module, section } = this.$store.state.url;
    if (!page && !module && !section) {
      this.$store.dispatch('url/updatePage', 'management');
      this.$store.dispatch('url/updateModule', 'student');
      this.$store.dispatch('url/updateSection', 'student-list');
    }
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
