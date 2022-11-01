<!-- eslint-disable max-len -->
<template>
  <!-- grid have 3 col and mx=8 my=4 -->
  <div class="grid gap-x-8 gap-y-4 grid-cols-4">
    <HeaderPage class="col-span-4" />
    <TabBar class="mx-10" />
    <BannerFrame class="col-span-3" />
    <BannerInfo class="col-span-4" />
    <BoardTopic
      class="col-span-4"
      :name-major="'Chuyên ngành công nghệ phần mềm'"
    />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import HeaderPage from '../components/Home/Header.vue';
import TabBar from '../components/Home/TabBar.vue';
import BannerFrame from '../components/Home/BannerFrame.vue';
import BannerInfo from '../components/Home/BannerInfo.vue';
import BoardTopic from '../components/Home/BoardTopic.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderPage,
    TabBar,
    BannerFrame,
    BannerInfo,
    BoardTopic,
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
