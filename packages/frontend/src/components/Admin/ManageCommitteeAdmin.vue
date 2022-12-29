<template>
  <div class="flex">
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      @click="$store.dispatch('url/updateSection', 'committee-import')"
    >
      Thêm hội đồng
    </div>
    <!-- <UploadButtonVue @uploadFileExcel="upload" /> -->
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
            Mã hội đồng
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên hội đồng
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Danh sách hội đồng
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
          v-for="committee in committees"
          :key="`committee-${committee._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <td class="py-4 px-6">
            <div class="font-bold cursor-pointer">
              {{ committee.code }}
            </div>
          </td>
          <th
            :key="`committee-${committee._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ committee.name }}
          </th>
          <td class=" flex py-4 px-6 flex-col">
            <div class="font-semibold cursor-pointer">
              - Chủ tịch hội đồng: {{ committee.committeePresidentId ? committee.committeePresidentId.name : '' }}
            </div>
            <div class="font-semibold cursor-pointer">
              - Thư ký hội đồng: {{ committee.committeeSecretaryId? committee.committeeSecretaryId.name: '' }}
            </div>
            <div class="font-semibold cursor-pointer">
              - Giáo viên phản biện: {{ committee.criticalLecturerId? committee.criticalLecturerId.name: '' }}
            </div>
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleAddTopic(committee._id)"
            >Cập nhật đề tài </a>
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateStudent(committee._id)"
            >Sửa</a>
            <a
              class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowStudent(committee._id)"
            >Xem chi tiết</a>
            <a
              class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
              @click="handleRemoveStudent(committee._id)"
            >Xóa</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ConfirmModal
    v-model="showConfirmModal"
    @confirm="confirmRemove"
    @cancel="showConfirmModal=false"
  >
    <template #title>
      Xác nhận
    </template>
    <div>Bạn có xác nhận xóa hội đồng này không?</div>
  </ConfirmModal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';
import 'vue-search-input/dist/styles.css';
import ConfirmModal from '../Modal/ConfirmModal.vue';

export default {
  name: 'ManageStudentAdmin',
  components: {
    SearchInput,
    ConfirmModal,
  },
  data () {
    return {
      showConfirmModal: false,
      removeId: '',
      searchVal: '',
      committees: [],
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('committee', [
      'listCommittee',
    ]),
    ...mapGetters('lecturer', [
      'listLecturer',
    ]),
  },
  async mounted () {
    await this.$store.dispatch('committee/fetchListCommittee', this.token);
    this.committees = this.listCommittee;
  },
  methods: {
    async confirmRemove () {
      const id = this.removeId;
      this.showConfirmModal = false;
      try {
        await this.$store.dispatch('committee/deleteCommittee', { token: this.token, id });
        await this.$store.dispatch('committee/fetchListCommittee', this.token);
        this.committees = this.listCommittee;
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
      this.removeId = '';
    },
    handleAddTopic (id) {
      this.$store.dispatch('url/updateSection', 'committee-add-topic');
      this.$store.dispatch('url/updateId', id);
    },
    handleUpdateStudent (id) {
      this.$store.dispatch('url/updateSection', 'committee-update');
      this.$store.dispatch('url/updateId', id);
    },
    handleShowStudent (id) {
      this.$store.dispatch('url/updateSection', 'committee-view');
      this.$store.dispatch('url/updateId', id);
    },
    async handleRemoveStudent (id) {
      this.removeId = id;
      this.showConfirmModal = true;
    },
    async upload (files) {
      if (files.length > 0) {
        await this.$store.dispatch('committee/importCommittee', { token: this.token, xlsx: files[0] })
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
        const committeeFilters = this.listCommittee.filter((st) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (st.name.match(re)) return true;
          if (st.code.match(re)) return true;
          if (st.committeePresidentId && st.committeePresidentId.name.match(re)) return true;
          if (st.committeeSecretaryId && st.committeeSecretaryId.name.match(re)) return true;
          if (st.criticalLecturerId && st.criticalLecturerId.name.match(re)) return true;
          return false;
        });
        this.committees = committeeFilters;
      } else this.committees = this.listCommittee;
    },
  },
};
</script>
