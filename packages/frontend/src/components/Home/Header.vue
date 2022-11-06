<template>
  <div class="flex h-[60px] shadow-2xl rounded">
    <img
      class="h-[40px] my-auto ml-5 w-[50px]"
      src="https://fit.hcmute.edu.vn/Resources/Images/SubDomain/fit/logo-cntt2021.png"
    >
    <div class="grow flex">
      <div class="grow" />
      <HeaderButton :name-button="'Tin tức'" />
      <HeaderButton :name-button="'Đào tạo'" />
      <HeaderButton :name-button="'Bộ môn'" />
      <HeaderButton :name-button="'Sinh viên'" />
      <HeaderButton :name-button="'Nghiên cứu'" />
      <HeaderButton :name-button="'Hoạt động'" />
      <HeaderButton :name-button="'Tư vấn'" />
      <HeaderButton :name-button="'TT-Tin học'" />
      <HeaderButton :name-button="'Giới thiệu'" />
      <LoginButton />
    </div>
  </div>
</template>

<script>
import HeaderButton from './HeaderButton.vue';
import LoginButton from './LoginButton.vue';

export default {
  name: 'HeaderBar',
  components: {
    HeaderButton,
    LoginButton,
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
