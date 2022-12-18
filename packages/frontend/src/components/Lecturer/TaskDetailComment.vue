<template>
  <div class="my-2 p-2 rounded-md bg-gray-100">
    <div
      v-if="comment.createdByFilter"
      class="flex items-center justify-between"
    >
      <span class="font-bold">
        {{ comment.createdByFilter.name }}
      </span>
      <span>
        {{ timeAgo(comment.createdAt) }}
      </span>
    </div>
    {{ comment.message }}

    <!-- {{ comment }} -->
  </div>
</template>
<script>
import moment from 'moment';

export default {
  props: {
    comment: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    timeAgo (createdAt) {
      return moment(createdAt).fromNow();
    },
  },
};
</script>
