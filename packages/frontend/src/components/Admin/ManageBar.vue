<!-- eslint-disable max-len -->
<template>
  <div
    x-transition:enter="transform transition-transform duration-300"
    x-transition:enter-start="-translate-x-full"
    x-transition:enter-end="translate-x-0"
    x-transition:leave="transform transition-transform duration-300"
    x-transition:leave-start="translate-x-0"
    x-transition:leave-end="-translate-x-full"
    x-show="isSidebarOpen"
    class="fixed inset-y-0 left-0 z-10 flex-shrink-0 w-64 bg-white border-r-2 border-indigo-100 shadow-lg sm:left-16 rounded-tr-3xl rounded-br-3xl sm:w-72 lg:static lg:w-64"
  >
    <nav
      aria-label="Main"
      class="flex flex-col h-full"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center flex-shrink-0 py-10">
        <a href="#">
          <img
            class="w-2/3 mx-auto"
            src="https://fit.hcmute.edu.vn/Resources/Images/SubDomain/fit/logo-cntt2021.png"
          >
        </a>
      </div>

      <!-- Links -->
      <div class="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto">
        <a
          href="#"
          class="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg"
        >
          <span
            aria-hidden="true"
            class="p-2 bg-indigo-700 rounded-lg"
          >
            <svg
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </span>
          <span>Quản lý sinh viên</span>
        </a>
        <a
          href="#"
          class="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg"
        >
          <span
            aria-hidden="true"
            class="p-2 bg-indigo-700 rounded-lg"
          >
            <svg
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </span>
          <span>Quản lý admin</span>
        </a>
        <a
          href="#"
          class="flex items-center w-full space-x-2 text-white bg-indigo-600 rounded-lg"
        >
          <span
            aria-hidden="true"
            class="p-2 bg-indigo-700 rounded-lg"
          >
            <svg
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </span>
          <span>Quản lý giáo viên</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white"
        >
          <span
            aria-hidden="true"
            class="p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white"
          >
            <svg
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span>Quản lý người dùng</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white"
        >
          <span
            aria-hidden="true"
            class="p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white"
          >
            <svg
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span>Quản lý đăng ký đề tài</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white"
        >
          <span
            aria-hidden="true"
            class="p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white"
          >
            <svg
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span>Duyệt đề xuất đề tài</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-2 text-indigo-600 transition-colors rounded-lg group hover:bg-indigo-600 hover:text-white"
        >
          <span
            aria-hidden="true"
            class="p-2 transition-colors rounded-lg group-hover:bg-indigo-700 group-hover:text-white"
          >
            <svg
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span>Quản lý lịch đăng ký</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ManageBar',
  components: {
  },
  props: {
  },
  data () {
    return {
    };
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
