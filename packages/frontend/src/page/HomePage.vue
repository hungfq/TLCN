<!-- eslint-disable max-len -->
<template>
  <div class="grid gap-x-8 gap-y-4 grid-cols-3">
    <HeaderPage class="col-span-3" />
    <TabBar class="mx-10" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import HeaderPage from '../components/Home/Header.vue';
import TabBar from '../components/Home/TabBar.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderPage,
    TabBar,
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
