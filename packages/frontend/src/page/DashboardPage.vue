<!-- eslint-disable max-len -->
<template>
  <div class="flex bg-slate-300">
    <SideBar />
    <div class="flex flex-col w-full">
      <HeaderBar />
      <div class=" h-full bg-white m-2 rounded-xl">
        <TableDKMH />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/Dashboard/SideBar.vue';
import HeaderBar from '../components/Dashboard/HeaderBar.vue';
import TableDKMH from '../components/Dashboard/TableDKMH.vue';

export default {
  name: 'DashboardPage',
  components: {
    SideBar,
    HeaderBar,
    TableDKMH,
  },
  props: {
  },
  data () {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
