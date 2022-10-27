<template>
  <div class="flex h-[400px] w-[300px] shadow-2xl rounded bg-gray-300 flex-col ml-10">
    <div class="h-[30px] bg-gray-400 text-center rounded-lg pt-1">
      <span>Danh sách mục lục</span>
    </div>
    <TabBarItem name-item="Chuyên ngành công nghệ thông tin" />
    <TabBarItem name-item="Chuyên nghành hệ thống thông tin" />
    <TabBarItem name-item="Chuyên ngành mạng máy tính" />
    <TabBarItem name-item="Chuyên ngành trí tuệ nhân tạo" />
    <TabBarItem name-item="Chuyên ngành kỹ thuật dữ liệu" />
  </div>
</template>

<script>
import TabBarItem from './TabBarItem.vue';

export default {
  name: 'TabBar',
  components: {
    TabBarItem,
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
