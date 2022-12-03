<!-- eslint-disable max-len -->
<template>
  <!-- grid have 3 col and mx=8 my=4 -->
  <div class="flex flex-col">
    <HeaderPage class="my-10" />
    <BannerFrame class="my-10" />
    <BannerInfo class="my-10" />
    <BoardTopic
      class="my-10"
      :name-major="'Công nghệ phần mềm'"
      :url-image="imageUrlCNPM"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HeaderPage from '../components/Home/Header.vue';
import BannerFrame from '../components/Home/BannerFrame.vue';
import BannerInfo from '../components/Home/BannerInfo.vue';
import BoardTopic from '../components/Home/BoardTopic.vue';
import MajorApi from '../utils/api/major';
import TopicApi from '../utils/api/topic';

const imageUrlCNPM = new URL('../assets/images/Khoa_CNPM.png', import.meta.url).href;
const imageUrlHTTT = new URL('../assets/images/Khoa_HTTT.jpg', import.meta.url).href;
const imageUrlATTT = new URL('../assets/images/Khoa_ATTT.png', import.meta.url).href;

export default {
  name: 'HomePage',
  components: {
    HeaderPage,
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
      listMajor: [],
      mapTopic: [],
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.isAuthenticated,
      userInfo: (state) => state.ui.auth.userinfo,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
  },
  watch: {
    // Note: only simple paths. Expressions are not supported.
  },
  async mounted () {

  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
