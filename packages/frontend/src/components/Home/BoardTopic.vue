<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-col h-[800px] shadow-2xl rounded bg-white  mx-10 my-10 pb-4">
    <span class="font-sans font-semibold text-lg mt-4 ml-4"> {{ nameMajor }}</span>
    <div class="h-full grid gap-x-4 gap-y-4 grid-cols-5 mt-4 mx-4">
      <img
        class="h-[300px] w-[550px] bg-gray-600 col-span-2 rounded-lg"
        :src="urlImage"
      >
      <div
        v-for="(topic, index) in topics"
        :key="`topic ${index}`"
        class="h-[300px] bg-gray-300 rounded-lg flex flex-col p-2 mx-2"
      >
        <img
          class="h-[150px] w-full bg-black rounded-lg"
          alt="Ảnh của giáo viên"
          :src="topic.imageTeacher"
        >
        <span class="my-auto text-lg font-sans font-semibold text-center">{{ topic.nameTopic }}</span>
        <span class="my-auto text-base font-sans font-light text-center">Giảng viên hướng dẫn: {{ topic.nameTeacher }}</span>
        <div
          class="my-auto h-[30px] font-sans font-medium rounded-lg bg-blue-800 text-white text-center center"
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
      default: '',
    },
    urlImage: {
      type: String,
      default: '',
    },
    listTopics: {
      default: [
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop0',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop1',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop2',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop3',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop4',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop5',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop6',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop7',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop8',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop9',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop10',
          nameTeacher: 'Mai Tuấn Khôi',
        },
        {
          imageTeacher: 'https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg',
          nameTopic: 'Xây dựng ứng dụng thương mại điện tử Eshop11',
          nameTeacher: 'Mai Tuấn Khôi',
        },
      ],
    },
  },
  data () {
    return {
      indexSlide: 8,
    };
  },
  computed: {
    isNextSlide () {
      return !(this.listTopics.length <= 8);
    },
    topics () {
      if (!this.isNextSlide) return this.listTopics;
      return this.listTopics.slice(this.indexSlide - 8, this.indexSlide);
    },
  },
  methods: {
    onBack () {
      this.indexSlide -= 1;
      if (this.indexSlide < 8) this.indexSlide = this.listTopics.length;
    },
    onNext () {
      this.indexSlide += 1;
      if (this.indexSlide > this.listTopics.length) this.indexSlide = 8;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
