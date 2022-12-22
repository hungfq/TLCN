<template>
  <div
    class="h-6 rounded-full text-xs font-semibold flex items-center"
  >
    <span
      class="w-2 h-2 rounded-full mr-1"
    />
    <span>
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'teal',
    },
  },
};
</script>
