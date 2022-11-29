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
          Thông tin đề tài
        </h3>
      </div>
      <div class="ml-5 grid grid-cols-2">
        <FormKit
          type="text"
          name="title"
          label="Tiêu đề"
          help="Vd: Xây dụng web thương mại điện tử e-shop"
          validation="required"
        />
        <FormKit
          name="code"
          type="text"
          label="Mã đề tài"
          validation="required"
        />
        <FormKit
          name="description"
          type="textarea"
          label="Mô tả"
          help="Ghi các thông tin chi tiết tại đây"
          validation="required"
        />
        <FormKit
          name="limit"
          type="number"
          label="Số thành viên"
          validation="required"
        />
        <FormKit
          name="deadline"
          type="date"
          label="Thời hạn hoàn thành"
          validation="required"
        />
        <div class="w-3/4">
          <span class="font-bold text-sm">
            Giáo viên hướng dẫn
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="value2"
              :options="listLecturers"
            />
          </div>
        </div>
        <div class="my-2-1 w-3/4">
          <span class="font-bold text-sm py-4 my-4">
            Sinh viên đăng kí
          </span>
          <div class="mt-1">
            <Multiselect
              v-model="value"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options="listStudents"
            />
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
import { FormKitSchema } from '@formkit/vue';
import Multiselect from '@vueform/multiselect';
import { getValidationMessages } from '@formkit/validation';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'FormTopic',
  components: {
    Multiselect,
  },
  props: {
  },
  data () {
    return {
      title: '',
      code: '',
      description: '',
      limit: '',
      deadline: '',
      lecturerId: '',
      studentIds: [],
      data: '',
      value: null,
      value2: null,
      listStudents: [
        'student1',
        'student2',
        'student3',
        'student4',
      ],
      listLecturers: [
        'lecturer1',
        'lecturer2',
        'lecturer3',
      ],
      messages: '',
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
      return this.section === 'topic-import';
    },
    isUpdate () {
      return this.section === 'topic-update';
    },
    isView () {
      return this.section === 'topic-view';
    },
  },
  mounted () {

  },
  methods: {
    rollBack () {
      this.$store.dispatch('url/updateSection', `${this.module}-list`);
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
          } else if (this.module === 'admin') {
            this.$store.dispatch('admin/updateAdmin', {
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
          } else if (this.module === 'admin') {
            this.$store.dispatch('admin/addAdmin', {
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
    handleSubmit () {
      console.log('header');
    },
    handleChange () {
      console.log(this.value);
    },
    showErrors (node) {
      const validations = getValidationMessages(node);
      validations.forEach((inputMessages) => {
        messages.value = messages.value.concat(
          inputMessages.map((message) => message.value),
        );
      });
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>
