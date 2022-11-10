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
      :url-image="imageUrlCNPM"
    />
    <BoardTopic
      class="col-span-4"
      :name-major="'Chuyên ngành hệ thống thông tin'"
      :url-image="imageUrlHTTT"
    />
    <BoardTopic
      class="col-span-4"
      :name-major="'Chuyên ngành mạng và an ninh mạng'"
      :url-image="imageUrlATTT"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HeaderPage from '../components/Home/Header.vue';
import TabBar from '../components/Home/TabBar.vue';
import BannerFrame from '../components/Home/BannerFrame.vue';
import BannerInfo from '../components/Home/BannerInfo.vue';
import BoardTopic from '../components/Home/BoardTopic.vue';

const imageUrlCNPM = new URL('../assets/images/Khoa_CNPM.png', import.meta.url).href;
const imageUrlHTTT = new URL('../assets/images/Khoa_HTTT.jpg', import.meta.url).href;
const imageUrlATTT = new URL('../assets/images/Khoa_ATTT.png', import.meta.url).href;

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
      imageUrlCNPM,
      imageUrlHTTT,
      imageUrlATTT,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      userInfo: (state) => state.ui.auth.userinfo,
    }),
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
