<template>
  <div class="flex">
    <div
      class=" rounded mr-auto ml-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      @click="$store.dispatch('url/updateSection', 'student-import')"
    >
      Thêm sinh viên
    </div>
    <UploadButtonVue @uploadFileExcel="upload" />
    <div class="flex items-center justify-center mr-4">
      <a
        class=" rounded ml-auto mr-4 my-2 bg-gray-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
        href="http://localhost:5000/template/User"
      >Tải mẫu tệp excel</a>
    </div>
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
            Mã sinh viên
          </th>
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
          v-for="user in students"
          :key="`user-${user._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`user-${user._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ user.code }}
          </th>
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
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateStudent(user._id)"
            >Sửa</a>
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowStudent(user._id)"
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
import UploadButtonVue from './UploadButton.vue';

export default {
  name: 'ManageStudentAdmin',
  components: {
    SearchInput,
    UploadButtonVue,
  },
  data () {
    return {
      searchVal: '',
      students: [],
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('student', [
      'studentId', 'studentEmail', 'student', 'listStudents',
    ]),
  },
  async mounted () {
    await this.$store.dispatch('student/fetchListStudent', this.token);
    this.students = this.listStudents;
  },
  methods: {
    handleUpdateStudent (id) {
      this.$store.dispatch('url/updateSection', 'student-update');
      this.$store.dispatch('url/updateId', id);
    },
    handleShowStudent (id) {
      this.$store.dispatch('url/updateSection', 'student-view');
      this.$store.dispatch('url/updateId', id);
    },
    async upload (files) {
      if (files.length > 0) {
        await this.$store.dispatch('student/importStudent', { token: this.token, xlsx: files[0] })
          .then((data) => {
            if (data.status === 201) {
              this.$toast.success('Đã nhập thành công!');
            }
          });

        this.search();
      } else {
        this.$toast.error('File không tồn tại');
      }
    },
    search () {
      if (this.searchVal !== '') {
        const studentFilters = this.listStudents.filter((st) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (st.name.match(re)) return true;
          if (st.email.match(re)) return true;
          return false;
        });
        this.students = studentFilters;
      } else this.students = this.listStudents;
    },
  },
};
</script>
