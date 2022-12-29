<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-[10%]">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow ">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b ">
          <h3 class="text-xl font-semibold text-gray-900 ">
            Thông báo lỗi
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
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div class="font-medium">
            {{ message }}
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200  ">
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="$emit('closeError', close)"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>
<script>
export default {
  name: 'ErrorModal',
  inheritAttrs: false,
  props: {
    message: {
      type: String,
      default: '',
    },
  },
  emits: ['closeError'],
};
</script>
