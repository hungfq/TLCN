<!-- eslint-disable max-len -->
<template>
  <div class="flex bg-slate-300">
    <SideBar
      :select="select"
      :role="userRole"
      @changeSection="handleChange"
    />
    <div class="flex flex-col w-full">
      <HeaderBar :show-search="(select ==='register')" />
      <div class=" h-full bg-white m-2 rounded-xl">
        <TableDKMH v-if="select === 'register'" />
        <SearchTopic v-if="select === 'search'" />

        <ProfileInfo
          v-if="select === 'info'"
        />
        <TableDKMH v-if="select === 'result'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SideBar from '../components/Dashboard/SideBar.vue';
import HeaderBar from '../components/Dashboard/HeaderBar.vue';
import TableDKMH from '../components/Student/TableDKMH.vue';
import ProfileInfo from '../components/Dashboard/ProfileInfo.vue';
import SearchTopic from '../components/Student/SearchTopic.vue';

export default {
  name: 'DashboardPage',
  components: {
    SideBar,
    HeaderBar,
    TableDKMH,
    ProfileInfo,
    SearchTopic,
  },
  props: {
  },
  data () {
    return {
      select: 'register',
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole',
    ]),
  },
  methods: {
    handleChange (value) {
      this.select = value;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
