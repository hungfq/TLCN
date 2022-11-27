<!-- eslint-disable max-len -->
<template>
  <div class="flex bg-slate-300">
    <SideBar
      :select="select"
      :role="userRole"
      @changeSection="handleChange"
    />
    <div class="flex flex-col w-full">
      <HeaderBar
        :show-search="(select ==='register')"
        @search-header="handleSearchTopic"
      />
      <div class=" h-full bg-white m-2 rounded-xl">
        <TableDKMH
          v-if="select === 'register'"
          :list-topic="listTopic"
          @register-topic="fetchData"
        />
        <SearchTopic
          v-if="select === 'search'"
          :list-topic-search="listTopicSearch"
          @search="handleSearchTopic"
        />
        <ProfileInfo v-if="select === 'info'" />
        <ResultRegisterStudent
          v-if="select === 'result'"
          :list-register-topic="listRegisterByUser"
          @cancel-register="fetchData"
        />
        <ManageRegisterTeacher v-if="select === 'manage_register_teacher'" />
        <ManageTopicTeacher v-if="select === 'manage_topic_teacher'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { ModalsContainer } from 'vue-final-modal';
import SideBar from '../components/Dashboard/SideBar.vue';
import HeaderBar from '../components/Dashboard/HeaderBar.vue';
import TableDKMH from '../components/Student/TableDKMH.vue';
import ProfileInfo from '../components/Dashboard/ProfileInfo.vue';
import SearchTopic from '../components/Student/SearchTopic.vue';
import ResultRegisterStudent from '../components/Student/ResultRegisterStudent.vue';
import ManageTopicTeacher from '../components/Teacher/ManageTopicTeacher.vue';
import ManageRegisterTeacher from '../components/Teacher/ManageRegisterTeacher.vue';
import TopicApi from '../utils/api/topic';
import RegisterApi from '../utils/api/register';

export default {
  name: 'DashboardPage',
  components: {
    SideBar,
    HeaderBar,
    TableDKMH,
    ProfileInfo,
    SearchTopic,
    ManageTopicTeacher,
    ManageRegisterTeacher,
    ResultRegisterStudent,
  },
  props: {
  },
  data () {
    return {
      select: null,
      listTopic: [],
      listTopicSearch: [],
      showConfirmRegister: false,
      listRegisterByUser: [],
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
  },
  async mounted () {
    await this.fetchData();
  },
  methods: {
    handleChange (value) {
      this.select = value;
    },
    async handleSearchTopic (data) {
      this.listTopicSearch = await TopicApi.listTopicWithName(this.token, data.value, data.type) || [];
      this.select = 'search';
    },
    async fetchData () {
      try {
        this.listTopic = await TopicApi.listAllTopics(this.token) || [];
        this.listRegisterByUser = await RegisterApi.studentViewRegister(this.token);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
