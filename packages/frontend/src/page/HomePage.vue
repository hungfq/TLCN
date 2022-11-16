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
      :name-major="'Công nghệ phần mềm'"
      :url-image="imageUrlCNPM"
    />
    <BoardTopic
      class="col-span-4"
      :name-major="'Hệ thống thông tin'"
      :url-image="imageUrlHTTT"
    />
    <BoardTopic
      class="col-span-4"
      :name-major="'Mạng và an ninh mạng'"
      :url-image="imageUrlATTT"
    />
    <!-- <div v-for="item in mapTopic"> {{item.majorName}}  {{item.listTopic}} {{item.image}}</div> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HeaderPage from '../components/Home/Header.vue';
import TabBar from '../components/Home/TabBar.vue';
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
    try {
      const mapTopic = [];
      const listMajor = await MajorApi.listAllMajor(this.token);
      listMajor.forEach(async (major) => {
        let image = this.imageUrlCNPM;
        if (major.name === 'Hệ thống Thông tin') image = this.imageUrlHTTT;
        else if (major.name === 'Công nghệ Phần mềm') image = this.imageUrlCNPM;
        else if (major.name === 'Mạng và An ninh mạng') image = this.imageUrlATTT;
        const listTopic = await TopicApi.listAllTopicsWithMajor(this.token, major._id);
        mapTopic.push({ majorName: major.name, listTopic });
      });
      this.mapTopic = mapTopic;
      this.listMajor = listMajor;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
