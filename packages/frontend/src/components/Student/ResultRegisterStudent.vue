<!-- eslint-disable max-len -->
<template>
  <div class="text-xl text-center font-sans my-4 font-bold">
    Các chương trình đã đăng ký
  </div>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg m-4">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-300">
        <tr>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên đề tài
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Giáo viên hướng dẫn
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
          v-for="register in listRegisterTopic"
          :key="`register-${register.topicId._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`register-${register._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ register.topicId.title }}
          </th>
          <td class="py-4 px-6">
            {{ register.topicId.lecturerId.name }}
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleRemoveTopic(register._id,register.topicId.title,register.topicId.lecturerId.name)"
            >Xóa đăng ký</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowTopic(register._id,register.topicId.title,register.topicId.lecturerId.name, register.topicId.description)"
            >Xem chi tiết</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import RegisterApi from '../../utils/api/register';

export default {
  name: 'ResultRegisterStudent',
  components: {
  },
  props: {
    listRegisterTopic: Array,
  },
  emits: ['cancel-register'],
  data () {
    return {
      show: false,
      showInfoModal: false,
      showErrorModal: false,
      currentRegisterId: '',
      currentTopicName: '',
      currentTeacher: '',
      currentDescriptionTopic: '',
      messageError: '',
    };
  },
  computed: {
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
  },
  methods: {
    async confirm () {
      this.show = false;
      try {
        await RegisterApi.studentCancelRegister(this.token, this.currentRegisterId);
        this.currentRegisterId = '';
        this.currentTopicName = '';
        this.currentTeacher = '';
        this.$emit('cancel-register');
      } catch (err) {
        this.messageError = 'Đã có lỗi xảy ra vui lòng xử lý lại';
        this.showErrorModal = true;
      }
    },
    cancel () {
      this.currentRegisterId = '';
      this.currentTopicName = '';
      this.currentTeacher = '';
      this.show = false;
    },
    handleRemoveTopic (registerId, topicName, teacherName) {
      this.currentRegisterId = registerId;
      this.currentTopicName = topicName;
      this.currentTeacher = teacherName;
      this.show = true;
    },
    handleShowTopic (registerId, topicName, teacherName, description) {
      this.currentRegisterId = registerId;
      this.currentTopicName = topicName;
      this.currentTeacher = teacherName;
      this.currentDescriptionTopic = description;
      this.showInfoModal = true;
    },
    closeInfoModal (close) {
      this.currentRegisterId = '';
      this.currentTopicName = '';
      this.currentTeacher = '';
      this.currentContentTopic = '';
      this.currentDescriptionTopic = '';
      close();
      this.showInfoModal = false;
    },
    closeErrorModal (close) {
      this.currentRegisterId = '';
      this.currentTopicName = '';
      this.currentTeacher = '';
      this.currentContentTopic = '';
      this.currentDescriptionTopic = '';
      close();
      this.showErrorModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
