<!-- eslint-disable max-len -->
<template>
  <div
    class="overflow-x-auto shadow-md sm:rounded-lg mx-4 mt-4 h-[700px]"
  >
    <table
      class="
    w-full
    text-sm
    text-left
    text-gray-500"
    >
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
            Chuyên ngành
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Số lượng
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
          v-for="topic in listTopic"
          :key="`topic-${topic._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.title }}
          </th>
          <td class="py-4 px-6">
            <div
              class="font-bold cursor-pointer"
              @click="handleShowInfoTeacher(topic.lecturerId._id)"
            >
              {{ topic.lecturerId.name }}
            </div>
          </td>
          <td class="py-4 px-6">
            <div
              class="font-bolds"
            >
              {{ topic.majorId.name }}
            </div>
          </td>
          <td class="py-4 px-6">
            {{ `${topic.current} / ${topic.limit}` }}
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleRegisterTopic(topic._id,topic.title,topic.lecturerId.name)"
            >Đăng kí</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowTopic(topic._id,topic.title,topic.lecturerId.name, topic.description)"
            >Xem chi tiết</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import UserApi from '../../utils/api/user';

export default {
  name: 'TableDKMH',
  components: {
  },
  props: {
    listTopic: Array,
  },
  emits: ['register-topic'],
  data () {
    return {
      show: false,
      showInfoModal: false,
      showErrorModal: false,
      showInfoTeacher: false,
      currentTopicId: '',
      currentTopicName: '',
      currentTeacher: '',
      currentDescriptionTopic: '',
      messageError: '',
      currentTeacherInfo: {},
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
        await RegisterApi.registerTopic(this.token, this.userId, this.currentTopicId);
        this.currentTopicId = '';
        this.currentTopicName = '';
        this.currentTeacher = '';
        this.$emit('register-topic');
      } catch (err) {
        if (err.response.status === 400) {
          this.messageError = 'Vui lòng xóa đăng ký đã tồn tại trước khi đăng ký mới';
        } else {
          this.messageError = 'Đã có lỗi xảy ra vui lòng xử lý lại';
        }
        this.showErrorModal = true;
      }
    },
    cancel () {
      this.currentTopicId = '';
      this.currentTopicName = '';
      this.currentTeacher = '';
      this.show = false;
    },
    handleRegisterTopic (topicId, topicName, teacherName) {
      this.currentTopicId = topicId;
      this.currentTopicName = topicName;
      this.currentTeacher = teacherName;
      this.show = true;
    },
    handleShowTopic (topicId, topicName, teacherName, description) {
      this.currentTopicId = topicId;
      this.currentTopicName = topicName;
      this.currentTeacher = teacherName;
      this.currentDescriptionTopic = description;
      this.showInfoModal = true;
    },
    async handleShowInfoTeacher (id) {
      try {
        this.currentTeacherInfo = await UserApi.getUserById(this.token, id);
        this.showInfoTeacher = true;
      } catch (e) {
        this.messageError = 'Đã có lỗi xảy ra vui lòng xử lý lại';
        this.showErrorModal = true;
      }
    },
    closeInfoModal (close) {
      this.currentTopicId = '';
      this.currentTopicName = '';
      this.currentTeacher = '';
      this.currentContentTopic = '';
      this.currentDescriptionTopic = '';
      close();
      this.showInfoModal = false;
    },
    closeErrorModal (close) {
      this.currentTopicId = '';
      this.currentTopicName = '';
      this.currentTeacher = '';
      this.currentContentTopic = '';
      this.currentDescriptionTopic = '';
      close();
      this.showErrorModal = false;
    },
    closeInfoUserModal (close) {
      this.currentTeacherInfo = { name: '', email: '', sex: '' };
      close();
      this.showInfoTeacher = false;
    },
    displayNameTeacher (teacher) {
      if (teacher && teacher.name) return teacher.name;
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
