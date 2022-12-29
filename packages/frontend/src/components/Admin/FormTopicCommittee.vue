<!-- eslint-disable max-len -->
<template>
  <div
    class="mx-4 my-4 rounded px-2 py-2 bg-slate-500 w-fit text-white font-semibold cursor-pointer"
    @click="rollBack"
  >
    Quay về
  </div>
  <div class="p-4 w-full mx-auto mt-[10px] ">
    <!-- Modal content -->
    <div class="bg-white rounded-lg shadow h-[350px]">
      <!-- Modal header -->
      <div class="flex justify-between items-start p-4 rounded-t border-b">
        <h3 class="text-xl font-semibold text-gray-900">
          Thông tin đề tài
        </h3>
      </div>
      <div class=" mx-4 my-4">
        <span class="font-bold text-sm">
          Danh đề tài được GVHD và GVPB duyệt
        </span>
        <div class="mt-1">
          <Multiselect
            v-model="topics"
            mode="tags"
            :close-on-select="false"
            :searchable="true"
            :options="listTopics"
            :disabled="isView"
            class="h-[200px]"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- Modal footer -->
  <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 my-4">
    <button
      v-if="!isView"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="handleAddTopicAdmin"
    >
      {{ 'Cập nhật' }}
    </button>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { mapGetters } from 'vuex';
import TopicApi from '../../utils/api/topic';

export default {
  name: 'FormTopic',
  components: {
    Multiselect,
  },
  props: {
  },
  data () {
    return {
      code: '',
      name: '',
      committeePresidentId: '',
      committeeSecretaryId: '',
      criticalLecturerId: '',
      listLecturers: [
        'lecturer1',
        'lecturer2',
        'lecturer3',
      ],
      messages: '',
      listTopics: [],
      topics: [],
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
      return this.section === 'committee-import';
    },
    isUpdate () {
      return this.section === 'committee-update';
    },
    isView () {
      return this.section === 'committee-view';
    },
  },
  async mounted () {
    await this.$store.dispatch('committee/fetchListCommittee', this.token);
    const { id } = this.$store.state.url;
    const { listCommittee } = this.$store.state.committee;
    const committee = listCommittee.find((s) => s._id.toString() === id.toString());
    if (committee) {
      this.name = committee.name;
      this.code = committee.code;
      this.committeePresidentId = committee.committeePresidentId._id;
      this.committeeSecretaryId = committee.committeeSecretaryId._id;
      this.criticalLecturerId = committee.criticalLecturerId._id;
      this.topics = committee.topics;
    }
    let topics = [];
    if (this.criticalLecturerId) {
      topics = await TopicApi.topicCommitteeByCritical(this.token, this.criticalLecturerId);
    }
    this.listTopics = topics.map((s) => {
      const l = {
        value: s._id,
        label: s.title,
      };
      return l;
    });
  },
  methods: {
    rollBack () {
      this.$store.dispatch('url/updateSection', `${this.module}-list`);
    },
    async handleAddTopicAdmin () {
      const value = {
        id: this.id,
        topics: this.topics,
      };
      try {
        await this.$store.dispatch('committee/updateCommittee', { token: this.token, value, type: 'ADD_TOPIC' });
        this.$toast.success('Đã cập nhật một thành công!');
        this.rollBack();
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>
