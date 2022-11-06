<!-- eslint-disable max-len -->
<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg m-4">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
        <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
  name: 'TableDKMH',
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
