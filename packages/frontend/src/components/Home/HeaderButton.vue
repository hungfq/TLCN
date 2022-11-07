<template>
  <div class="h-[40px] my-auto font-sans font-semibold mr-5 align-middle pt-2">
    {{ nameButton }}
  </div>
</template>

<script>

export default {
  name: 'HeaderButton',
  props: {
    nameButton: {
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
