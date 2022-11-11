<!-- eslint-disable max-len -->
<template>
  <div class="flex bg-slate-300">
    <SideBar
      :select="select"
      @changeSection="handleChange"
    />
    <div class="flex flex-col w-full">
      <HeaderBar :show-search="(select ==='register')" />
      <div class=" h-full bg-white m-2 rounded-xl">
        <TableDKMH v-if="select === 'register'" />
        <template v-if="select === 'search'">
          <div class="m-2 flex">
            <div class="relative w-1/3 mt-2 ml-2">
              <select
                id="grid-state"
                class="block appearance-none w-full py-2 pl-4 text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Mặc đinh</option>
                <option>Tên đề tài</option>
                <option>Tên giáo viên</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mb-2">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                ><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
            <SearchBar class="relative w-2/3 m-2" />
          </div>

          <TableDKMH />
        </template>
        <ProfileInfo
          v-if="select === 'info'"
        />
        <TableDKMH v-if="select === 'result'" />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/Dashboard/SideBar.vue';
import HeaderBar from '../components/Dashboard/HeaderBar.vue';
import TableDKMH from '../components/Dashboard/TableDKMH.vue';
import ProfileInfo from '../components/Dashboard/ProfileInfo.vue';
import SearchBar from '../components/Dashboard/SearchBar.vue';

export default {
  name: 'DashboardPage',
  components: {
    SideBar,
    HeaderBar,
    TableDKMH,
    SearchBar,
    ProfileInfo,
  },
  props: {
  },
  data () {
    return {
      select: 'register',
    };
  },
  computed: {
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
