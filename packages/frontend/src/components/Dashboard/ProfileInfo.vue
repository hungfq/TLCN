<!-- eslint-disable max-len -->
<template>
  <div class="m-4">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Thông tin cá nhân
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Xác nhận thông tin nhập vào là chính xác
          </p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
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
                    type="text"
                    class="mt-1 px-2 block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label
                    class="block text-sm font-medium text-gray-700"
                  >Mã số</label>
                  <input
                    v-model="code"
                    type="text"
                    class="mt-1 px-2 block w-full rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label
                    class="block text-sm font-medium text-gray-700"
                  >Email</label>
                  <input
                    v-model="userEmail"
                    disabled
                    type="text"
                    class="mt-1 block w-full cursor-not-allowed rounded-md py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    class="block text-sm font-medium text-gray-700"
                  >Giới tính</label>
                  <select
                    v-model="sex"
                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="updateInfoUser(token, name, code, sex)"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import UserApi from '../../utils/api/user';

export default {
  name: 'ProfileInfo',
  components: {
  },
  props: {
  },
  data () {
    return {
      code: '',
      name: '',
      sex: '',
      options: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' },
      ],
    };
  },
  computed: {
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token', 'useName',
    ]),
  },
  async mounted () {
    try {
      const user = await UserApi.getUserInfo(this.token);
      this.name = user.name;
      this.code = user.code;
      this.sex = user.sex;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async updateInfoUser () {
      try {
        await UserApi.editProfile(this.token, this.name, this.code, this.sex);
        await this.$store.dispatch('auth/fetchInfo', this.token);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
