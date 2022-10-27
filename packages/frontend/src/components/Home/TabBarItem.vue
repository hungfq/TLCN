<template>
  <div class="h-[40px] my-2">
    <span class="my-2 ml-4 pt-1"> {{ nameItem }}</span>
  </div>
</template>

<script>

export default {
  name: 'TabBarItem',
  components: {
  },
  props: {
    nameItem: {
      type: String,
      default: '',
    },
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
