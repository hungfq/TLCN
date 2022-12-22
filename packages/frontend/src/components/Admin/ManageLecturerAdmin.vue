<template>
  <div class="flex">
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      @click="$store.dispatch('url/updateSection', 'lecturer-import')"
    >
      Thêm giảng viên
    </div>
    <form
      class="flex items-center justify-center"
      @submit.prevent="upload"
    >
      <input
        ref="uploadBtn"
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      >
      <button type="submit">
        Tải lên tệp excel
      </button>
    </form>
  </div>
  <div class="shadow-md sm:rounded-lg m-4">
    <SearchInput
      v-model="searchVal"
      :search-icon="true"
      @keydown.space.enter="search"
    />
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-300">
        <tr>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên sinh viên
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Email
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in lecturers"
          :key="`user-${user._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`user-${user._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ user.name }}
          </th>
          <td class="py-4 px-6">
            <div class="font-bold cursor-pointer">
              {{ user.email }}
            </div>
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateLecturer(user._id)"
            >Sửa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowLecturer(user._id)"
            >Xem chi tiết</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
// Optionally import default styling
import 'vue-search-input/dist/styles.css';

export default {
  name: 'ManageLecturerAdmin',
  components: {

    SearchInput,
  },
  data () {
    return {
      searchVal: '',
      lecturers: [],
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('lecturer', [
      'lecturerId', 'lecturerEmail', 'lecturer', 'listLecturer',
    ]),
  },
  async mounted () {
    await this.$store.dispatch('lecturer/fetchListLecturer', this.token);
    this.lecturers = this.listLecturer;
  },
  methods: {
    handleUpdateLecturer (id) {
      this.$store.dispatch('url/updateSection', 'lecturer-update');
      this.$store.dispatch('url/updateId', id);
    },
    handleShowLecturer (id) {
      this.$store.dispatch('url/updateSection', 'lecturer-view');
      this.$store.dispatch('url/updateId', id);
    },
    upload () {
      const { files } = this.$refs.uploadBtn;

      if (files.length > 0) {
        this.$store.dispatch('lecturer/importLecturer', { token: this.token, xlsx: files[0] })
          .then((data) => {
            if (data.status === 201) {
              this.$toast.success('Đã nhập thành công!');
            }
          });

        this.$refs.uploadBtn.value = '';
      } else {
        this.$toast.error('File không tồn tại');
      }
    },
    search () {
      if (this.searchVal !== '') {
        const lecturerFilters = this.listLecturer.filter((st) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (st.name.match(re)) return true;
          if (st.email.match(re)) return true;
          return false;
        });
        this.lecturers = lecturerFilters;
      } else this.lecturers = this.listLecturer;
    },
  },
};
</script>
