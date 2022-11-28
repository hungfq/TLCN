<!-- eslint-disable max-len -->
<template>
  <div
    class="mx-4 my-4 rounded px-2 py-2 bg-slate-500 w-fit text-white font-semibold cursor-pointer"
    @click="rollBack"
  >
    Quay về
  </div>
  <div class="p-4 w-full h-full md:h-auto mx-auto mt-[10px]">
    <!-- Modal content -->
    <div class="bg-white rounded-lg shadow">
      <!-- Modal header -->
      <div class="flex justify-between items-start p-4 rounded-t border-b">
        <h3 class="text-xl font-semibold text-gray-900">
          Thông tin người dùng
        </h3>
      </div>
      <!-- Modal body -->
      <div class="mt-5">
        <div>
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-4">
                  <label
                    class="block text-sm font-medium text-gray-700"
                  >Họ và tên</label>
                  <input
                    v-model="name"
                    :disabled="isView"
                    type="text"
                    class="mt-1 px-2 block w-full rounded-md py-2 bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label
                    class="block text-sm font-medium text-gray-700"
                  >Mã số</label>
                  <input
                    v-model="code"
                    :disabled="isView || isUpdate"
                    type="text"
                    class="mt-1 px-2 block w-full rounded-md py-2 bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label
                    class="block text-sm font-medium text-gray-700"
                  >Email</label>
                  <input
                    v-model="email"
                    :disabled="isView"
                    type="email"
                    class="mt-1 px-2 block w-full rounded-md bg-gray-100 py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    class="block text-sm font-medium text-gray-700"
                  >Giới tính</label>
                  <select
                    v-model="gender"
                    :disabled="isView"
                    class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option
                      v-for="option in options"
                      :key="`key-${option.value}`"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
        <button
          v-if="!isView"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 bg-gray-100 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="handleAddUserAdmin"
        >
          {{ isSave ? 'Lưu' : 'Cập nhật' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'FormUser',
  components: {
  },
  props: {
  },
  data () {
    return {
      code: '',
      name: '',
      gender: '',
      email: '',
      options: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' },
      ],
    };
  },
  computed: {
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('auth', [
      'token',
    ]),
    isSave () {
      return this.section === 'student-import' || this.section === 'lecturer-import';
    },
    isUpdate () {
      return this.section === 'student-update' || this.section === 'lecturer-update';
    },
    isView () {
      return this.section === 'student-view' || this.section === 'lecturer-view';
    },
  },
  mounted () {
    const { section } = this.$store.state.url;
    if (section === 'student-update' || section === 'student-view') {
      const { id } = this.$store.state.url;
      const { listStudents } = this.$store.state.student;
      const student = listStudents.find((s) => s._id.toString() === id.toString());
      if (student) {
        this.name = student.name;
        this.code = student.code;
        this.email = student.email;
        this.gender = student.gender;
      }
    } else if (section === 'lecturer-update' || section === 'lecturer-view') {
      const { id } = this.$store.state.url;
      const { listLecturer } = this.$store.state.lecturer;
      const lecturer = listLecturer.find((s) => s._id.toString() === id.toString());
      if (lecturer) {
        this.name = lecturer.name;
        this.code = lecturer.code;
        this.email = lecturer.email;
        this.gender = lecturer.gender;
      }
    }
  },
  methods: {
    rollBack () {
      if (this.module === 'student') {
        this.$store.dispatch('url/updateSection', 'student-list');
      } else if (this.module === 'lecturer') {
        this.$store.dispatch('url/updateSection', 'lecturer-list');
      }
    },
    handleAddUserAdmin () {
      const value = {
        code: this.code, name: this.name, email: this.email, gender: this.gender, type: 'STUDENT',
      };
      try {
        if (this.isUpdate) {
          if (this.module === 'student') {
            this.$store.dispatch('student/updateStudent', {
              token: this.token, value,
            });
          } else if (this.module === 'lecturer') {
            this.$store.dispatch('lecturer/updateLecturer', {
              token: this.token, value,
            });
          }
          this.$toast.success('Đã cập nhật một thành công!');
        } else if (this.isSave) {
          if (this.module === 'student') {
            this.$store.dispatch('student/addStudent', {
              token: this.token, value,
            });
          } else if (this.module === 'lecturer') {
            this.$store.dispatch('lecturer/addLecturer', {
              token: this.token, value,
            });
          }
          this.$toast.success('Đã thêm một thành công!');
        }
        this.rollBack();
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
