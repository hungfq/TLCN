<template>
  <div class="flex mt-6">
    <div class="w-10 h-10 border-2 rounded-full text-center pt-1">
      {{ serialNumber }}
    </div>
    <div class="flex flex-col pl-6">
      <div class="font-sans text-2xl font-semibold">
        {{ firstText }}
      </div>
      <div class="pt-2 font-light">
        {{ secondText }}
      </div>
      <div class="flex-col pt-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'ChildLayout',
  props: {
    serialNumber: {
      type: Number,
      default: 1,
    },
    firstText: {
      type: String,
      default: '',
    },
    secondText: {
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
