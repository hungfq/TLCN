<!-- eslint-disable max-len -->
<template>
  <!-- Left mini bar -->
  <nav
    aria-label="Options"
    class="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 bg-white border-r-2 border-indigo-100 shadow-md sm:flex rounded-tr-3xl rounded-br-3xl"
  >
    <!-- Logo -->
    <div class="flex-shrink-0 py-4">
      <a href="#">
        <img
          class="h-[40px] my-auto w-[50px]"
          src="https://fit.hcmute.edu.vn/Resources/Images/SubDomain/fit/logo-cntt2021.png"
        >
      </a>
    </div>
    <div class="flex flex-col items-center flex-1 p-2 space-y-4">
      <!-- Menu button -->
      <button
        class="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
        :class=" 'text-white bg-indigo-600'"
        @click="updatePage('management')"
      >
        <span class="sr-only">Toggle sidebar</span>
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
      <!-- Messages button -->
      <!-- Notifications button -->
      <button
        class="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
        :class="'text-gray-500 bg-white'"
        @click="showNotificationModal = !showNotificationModal"
      >
        <span class="sr-only">Toggle notifications panel</span>
        <svg
          aria-hidden="true"
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <div
          v-show="showNotificationModal"
          class="absolute w-80 py-1 mx-2 bg-slate-300 left-16 top-12 h-[70%] rounded-xl"
          role="menu"
          aria-orientation="vertical"
          aria-label="user menu"
        >
          <div class="flex flex-col w-full">
            <div
              class="flex mx-2 mt-2 items-center pl-2 py-4 space-x-4 max-w-xs text-gray-500 bg-white rounded-lg divide-x divide-gray-200 shadow"
              role="alert"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-blue-600"
                focusable="false"
                data-prefix="fas"
                data-icon="paper-plane"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              ><path
                fill="currentColor"
                d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
              /></svg>
              <div class=" flex flex-col text-sm font-normal">
                <span class="font-bold text-left mx-2">Message sent successfully.</span>
                <span class="text-left mx-2">Message sent successfully. This as s sj sjjsjsj</span>
              </div>
            </div>
            <div
              class="flex mx-2 mt-2 items-center pl-2 py-4 space-x-4 max-w-xs text-gray-500 bg-white rounded-lg divide-x divide-gray-200 shadow"
              role="alert"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-blue-600"
                focusable="false"
                data-prefix="fas"
                data-icon="paper-plane"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              ><path
                fill="currentColor"
                d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
              /></svg>
              <div class=" flex flex-col text-sm font-normal">
                <span class="font-bold text-left mx-2">Message sent successfully.</span>
                <span class="text-left mx-2">Message sent successfully. This as s sj sjjsjsj</span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>

    <!-- User avatar -->
    <div
      class="relative flex items-center flex-shrink-0 p-2"
      x-data="{ isOpen: false }"
    >
      <button
        class="transition-opacity rounded-lg opacity-80 hover:opacity-100 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
        @click="miniAvatarShow = !miniAvatarShow"
      >
        <img
          class="w-10 h-10 rounded-lg shadow-md"
          src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
          alt="Ahmed Kamel"
        >
        <span class="sr-only">User menu</span>
      </button>
      <div
        v-show="miniAvatarShow"
        class="absolute w-48 py-1 mt-2 origin-bottom-left bg-white rounded-md shadow-lg left-10 bottom-14 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-label="user menu"
      >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >Your Profile</a>

        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >Settings</a>

        <a
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          @click="signOut"
        >Sign out</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'LeftMiniBar',
  components: {
  },
  props: {
  },
  data () {
    return {
      miniAvatarShow: false,
      showNotificationModal: false,
    };
  },
  computed: {
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
  },
  mounted () {
  },
  methods: {
    async signOut () {
      const { _id } = this.$store.state.auth.userInfo;
      await this.$store.$socket.emit('logout', _id);
      this.$store.dispatch('auth/signOut');
    },
    updatePage (module) {
      this.$store.dispatch('url/updatePage', module);
      console.log('🚀 ~ file: LeftMiniBar.vue:140 ~ updatePage ~ module', module);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
