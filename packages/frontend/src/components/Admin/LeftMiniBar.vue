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
          src="/fit.png"
        >
      </a>
    </div>
    <div class="flex flex-col items-center flex-1 p-2 space-y-4">
      <!-- Menu button -->
      <button
        class="p-2 transition-colors rounded-lg shadow-md hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
        :class=" 'text-white bg-indigo-600'"
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
          referrerpolicy="no-referrer"
          class="w-10 h-10 rounded-lg shadow-md"
          :src="userInfo ? userInfo.picture : '/default_avatar.png'"
          alt="Avatar"
        >
        <span class="sr-only">User menu</span>
      </button>
      <div
        v-show="miniAvatarShow"
        class="absolute w-48 py-1 mt-2 origin-bottom-left bg-white rounded-md shadow-lg left-16 bottom-2 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-label="user menu"
      >
        <!-- <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >Your Profile</a>

        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >Settings</a> -->

        <a
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          @click="signOut"
        >Đăng xuất</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LeftMiniBar',
  components: {
  },
  props: {
  },
  data () {
    return {
      miniAvatarShow: false,
    };
  },
  computed: {
    ...mapGetters('auth', [
      'userInfo',
    ]),
  },
  mounted () {
  },
  methods: {
    async signOut () {
      const { _id } = this.$store.state.auth.userInfo;
      await this.$store.dispatch('url/clearUrls');
      await this.$store.$socket.emit('logout', _id);
      this.$store.dispatch('auth/signOut');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
