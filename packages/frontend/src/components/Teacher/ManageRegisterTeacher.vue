<!-- eslint-disable max-len -->
<template>
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
        <tr class="bg-slate-300 border- hover:bg-gray-50 ">
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
          >
            Apple MacBook Pro 17"
          </th>
          <td class="py-4 px-6">
            Laptop
          </td>
          <td class="py-4 px-6">
            $2999
          </td>
          <td class="py-4 px-6 text-right">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
            >Đăng kí</a>
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
            >Xem chi tiết</a>
          </td>
        </tr>
        <tr class="bg-slate-300 border-b  hover:bg-gray-50 ">
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            Microsoft Surface Pro
          </th>
          <td class="py-4 px-6">
            Laptop PC
          </td>
          <td class="py-4 px-6">
            $1999
          </td>
          <td class="py-4 px-6 text-right">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
            >Đăng kí</a>
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
            >Xem chi tiết</a>
          </td>
        </tr>
        <tr class="bg-slate-300 hover:bg-gray-50 ">
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            Magic Mouse 2
          </th>
          <td class="py-4 px-6">
            Accessories
          </td>
          <td class="py-4 px-6">
            $99
          </td>
          <td class="py-4 px-6 text-right">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
            >Đăng kí</a>
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
            >Xem chi tiết</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ManageRegisterTeacher',
  components: {
  },
  props: {
  },
  data () {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
