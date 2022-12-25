<!-- eslint-disable max-len -->
<template>
  <form
    class="flex items-center justify-center"
    @submit.prevent="upload"
  >
    <input
      id="upload123"
      ref="uploadBtn"
      class="hidden"
      type="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @change="handleNewButtonClick"
    >
    <label
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      for="upload123"
    >Tải lên tệp excel</label>
    <button
      ref="submitBtn"
      type="submit"
      class="hidden"
    >
      Tải lên tệp excel
    </button>
  </form>
</template>

<script>
export default {
  name: 'UploadFileExcel',
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
  mounted () {
  },
  methods: {
    upload () {
      const { files } = this.$refs.uploadBtn;
      this.$emit('uploadFileExcel', files);
    },
    handleNewButtonClick () {
      this.$refs.submitBtn.click();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
