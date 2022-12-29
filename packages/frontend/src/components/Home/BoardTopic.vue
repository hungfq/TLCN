<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-col max-h-[800px] shadow-2xl rounded bg-white  mx-10 my-10 pb-4">
    <span class="font-sans font-semibold text-lg mt-4 ml-4"> {{ nameMajor }}</span>
    <div class="h-full grid gap-x-4 gap-y-4 grid-cols-5 mt-4 mx-4">
      <div
        v-for="(topic, index) in topics"
        :key="`topic ${index}`"
        class="min-h-[150px] bg-gray-300 rounded-lg flex flex-col p-2 mx-2"
      >
        <div
          class="w-full font-sans font-semibold  text-center my-2"
        >
          {{ topic.title }}
        </div>
        <span class=" text-base font-sans font-light text-center">Giảng viên hướng dẫn</span>
        <span class=" text-base font-sans font-light text-center"> {{ displayLecturer(topic.lecturerId) }}</span>
        <div
          class="my-auto h-[30px] font-sans font-medium rounded-lg bg-blue-800 text-white text-center center cursor-pointer"
          @click="$router.push('/student')"
        >
          Tìm hiểu thêm
        </div>
      </div>
    </div>
    <div
      v-if="isNextSlide"
      class="flex mx-auto"
    >
      <div
        class="text-5xl cursor-pointer"
        @click="onBack"
      >
        &lt;
      </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div
        class="text-5xl cursor-pointer"
        @click="onNext"
      >
        &gt;
      </div>
    </div>
  </div>
</template>
s
<script>

export default {
  name: 'BoardTopic',
  components: {
  },
  props: {
    nameMajor: {
      type: String,
      default: 'Danh sách đề tài',
    },
    listTopics: {
      default: [
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop0',
          nameTeacher: 'Mai Tuấn Khôi',
        },
      ],
    },
  },
  data () {
    return {
      indexSlide: 10,
    };
  },
  computed: {
    isNextSlide () {
      return !(this.listTopics.length <= 10);
    },
    topics () {
      if (!this.isNextSlide) return this.listTopics;
      return this.listTopics.slice(this.indexSlide - 10, this.indexSlide);
    },
  },
  methods: {
    displayLecturer (lecturer) {
      return lecturer ? lecturer.name : '';
    },
    onBack () {
      this.indexSlide -= 1;
      if (this.indexSlide < 10) this.indexSlide = this.listTopics.length;
    },
    onNext () {
      this.indexSlide += 1;
      if (this.indexSlide > this.listTopics.length) this.indexSlide = 10;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
