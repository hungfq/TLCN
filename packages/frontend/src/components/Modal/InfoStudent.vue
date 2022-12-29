<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    @before-open="handleShow(scheduleId)"
  >
    <div class="relative p-4 w-full max-w-4xl mx-auto mt-[5%] ">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow ">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b">
          <h3 class="text-xl font-semibold text-gray-900 ">
            Thông tin sinh viên
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="defaultModal"
            @click="close"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="px-6 py-2">
          <SearchInput
            v-model="searchVal"
            :search-icon="true"
            @keydown.space.enter="search"
          />
        </div>
        <!-- Modal body -->
        <div class="px-2 h-96 overflow-y-scroll">
          <div class="shadow-md sm:rounded-lg m-4 overflow-y-auto">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th
                    scope="col"
                    class="py-3 px-6"
                  >
                    STT
                  </th>
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
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, index) in listStudents"
                  :key="`user-${user._id}`"
                  class="bg-slate-300 hover:bg-gray-50 "
                >
                  <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                    {{ index+1 }}
                  </td>
                  <td
                    :key="`user-${user._id}`"
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {{ user.code }}
                  </td>
                  <td
                    :key="`user-${user._id}`"
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {{ user.name }}
                  </td>
                  <td class="py-4 px-6">
                    <div class="font-bold cursor-pointer">
                      {{ user.email }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center pl-6 p-2 space-x-2 rounded-b border-t border-gray-200  ">
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="close"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>
<script>
import { mapGetters } from 'vuex';
import SearchInput from 'vue-search-input';

export default {
  name: 'InfoModal',
  components: {
    SearchInput,
  },
  inheritAttrs: false,
  props: {
    scheduleId: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      searchVal: '',
      listStudents: [],
    };
  },
  computed: {
    ...mapGetters('auth', [
      'token',
    ]),
    ...mapGetters('schedule', [
      'listStudentsOfSchedule',
    ]),
  },
  methods: {
    async handleShow (scheduleId) {
      await this.$store.dispatch('schedule/fetchStudentsOfSchedule', { token: this.token, id: scheduleId });
      this.listStudents = this.listStudentsOfSchedule;
    },

    search () {
      if (this.searchVal !== '') {
        const listStudentsFilter = this.listStudentsOfSchedule.filter((st) => {
          const re = new RegExp(`\\b${this.searchVal}`, 'gi');
          if (st.name.match(re)) return true;
          if (st.code.match(re)) return true;
          if (st.email.match(re)) return true;
          return false;
        });
        this.listStudents = listStudentsFilter;
      } else this.listStudents = this.listStudentsOfSchedule;
    },
  },
};
</script>
