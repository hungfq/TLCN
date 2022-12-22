<!-- eslint-disable max-len -->
<template>
  <!-- grid have 3 col and mx=8 my=4 -->
  <div class="flex flex-col">
    <HeaderPage class="my-10" />
    <BannerFrame class="my-10" />
    <BannerInfo class="my-10" />
    <BoardTopic
      class="my-10"
      :url-image="imageUrlCNPM"
      :list-topics="listTopics"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HeaderPage from '../components/Home/Header.vue';
import BannerFrame from '../components/Home/BannerFrame.vue';
import BannerInfo from '../components/Home/BannerInfo.vue';
import BoardTopic from '../components/Home/BoardTopic.vue';

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
    ...mapGetters('topic', [
      'listTopics',
    ]),
  },
  watch: {
    // Note: only simple paths. Expressions are not supported.
  },
  async mounted () {
    await this.$store.dispatch('topic/fetchListTopics', 'huhu');
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
