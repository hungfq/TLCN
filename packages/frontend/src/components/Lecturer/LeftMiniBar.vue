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
        class="p-2 transition-colors rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-white focus:ring-offset-2"
        :class="'text-gray-500 bg-white'"
        @click="showNotification"
      >
        <span class="sr-only">Toggle notifications panel</span>
        <div
          v-if="unreadCount(listNotifications)"
          class="relative"
        >
          <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
            {{ unreadCount(listNotifications) }}
          </div>
        </div>
        
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
          class="overflow-y-auto max-h-[480px] shadow-lg absolute max-w-md mx-2 bg-slate-300 left-16 top-12 rounded-xl pb-2"
          role="menu"
          aria-orientation="vertical"
          aria-label="user menu"
        >
          <div
            v-if="!listNotifications.length"
            class="flex flex-col w-full"
          >
            <div class="mt-2 mx-2 px-12 py-28 bg-white rounded-lg shadow">
              Hiện không có thông báo
            </div>
          </div>
          <div
            v-for="noti in listNotifications"
            :key="`noti-${noti._id}`"
            class="flex flex-col w-full"
          >
            <div
              :class="[noti.isRead ? 'bg-white' : 'bg-emerald-50']"
              class="mt-2 mx-2 px-6 py-4 bg-white rounded-lg shadow"
              @click="readNotification(noti._id)"
            >
              <div class="inline-flex items-center justify-between w-full">
                <div class="inline-flex items-center">
                  <h3 class="font-bold text-base text-gray-800">
                    {{ noti.title }}
                  </h3>
                </div>
                <p class="text-xs text-gray-500">
                  {{ timeAgo(noti.createdAt) }}
                </p>
              </div>
              <div class="inline-flex items-center justify-between w-full">
                <p class="mt-1 text-sm text-left text-gray-900">
                  {{ noti.message }}
                </p>
                <a
                  class="text-blue-700"
                  @click="deleteNotification(noti._id)"
                >Xóa</a>
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
        class="absolute w-48 py-1 mt-2 origin-bottom-left bg-white rounded-md shadow-lg mx-1 left-16 bottom-14 focus:outline-none"
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
import moment from 'moment';

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
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('notification', [
      'listNotifications',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
  },
  async mounted () {
    await this.$store.dispatch('notification/fetchListNotifications', this.token);
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
    timeAgo (createdAt) {
      return moment(createdAt).fromNow();
    },
    unreadCount (listNotifications) {
      return listNotifications.filter((x) => x.isRead === false).length;
    },
    async showNotification () {
      this.showNotificationModal = !this.showNotificationModal;
    },
    async readNotification (_id) {
      await this.$store.dispatch('notification/readNotification', { token: this.token, id: _id });
    },
    async deleteNotification (_id) {
      await this.$store.dispatch('notification/deleteNotification', { token: this.token, id: _id });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
