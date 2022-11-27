<template>
  <div class="flex">
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      @click="$store.dispatch('url/updateSection', 'student-import')"
    >
      Thêm sinh viên
    </div>
    <form @submit.prevent="upload">
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
          v-for="user in listStudents"
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
              @click="handleUpdateStudent(user._id)"
            >Sửa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
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

export default {
  name: 'ManageStudentAdmin',
  components: {

  },
  data () {
    return {

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
  mounted () {
    this.$store.dispatch('student/fetchListStudent', this.token);
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
    upload () {
      const { files } = this.$refs.uploadBtn.files;
      const formData = new FormData();

      // if you want to upload multiple files at once loop
      // through the array of files
      formData.append('attachment', files[0]);
      console.log(formData);
    },
  },
};
</script>
