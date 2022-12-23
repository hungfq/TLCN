<template>
  <div class="my-2 p-2 rounded-md bg-gray-100">
    <div
      v-if="comment.createdByFilter"
      class="flex items-center justify-between"
    >
      <span class="font-bold">
        {{ comment.createdByFilter.name }}
      </span>
      <span class="text-sm font-extralight">
        {{ timeAgo(comment.createdAt) }}
        <template v-if="showDelete(comment.createdBy)">
          <button
            class="pl-2 hover:text-purple-700"
            @click="deleteClick(comment._id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              version="1.1"
              class="inline"
              stroke="currentColor"
            >
              <g id="surface1">
                <path
                  stroke-width="0.5"
                  d="M 15.816406 2.398438 L 12.699219 2.398438 C 12.542969 1.050781 11.398438 0 10.007812 0 C 8.621094 0 7.472656 1.050781 7.316406 2.398438 L 4.203125 2.398438 C 2.941406 2.398438 1.914062 3.425781 1.914062 4.683594 L 1.914062 4.800781 C 1.914062 5.765625 2.515625 6.589844 3.359375 6.925781 L 3.359375 17.730469 C 3.359375 18.992188 4.386719 20.019531 5.648438 20.019531 L 14.371094 20.019531 C 15.632812 20.019531 16.65625 18.992188 16.65625 17.730469 L 16.65625 6.925781 C 17.503906 6.589844 18.101562 5.765625 18.101562 4.800781 L 18.101562 4.683594 C 18.101562 3.425781 17.078125 2.398438 15.816406 2.398438 Z M 10.007812 1.085938 C 10.796875 1.085938 11.457031 1.652344 11.605469 2.398438 L 8.414062 2.398438 C 8.558594 1.652344 9.21875 1.085938 10.007812 1.085938 Z M 15.574219 17.730469 C 15.574219 18.394531 15.035156 18.933594 14.371094 18.933594 L 5.648438 18.933594 C 4.984375 18.933594 4.445312 18.394531 4.445312 17.730469 L 4.445312 7.089844 L 15.574219 7.089844 Z M 17.019531 4.800781 C 17.019531 5.464844 16.480469 6.003906 15.816406 6.003906 L 4.203125 6.003906 C 3.539062 6.003906 3 5.464844 3 4.800781 L 3 4.683594 C 3 4.023438 3.539062 3.484375 4.203125 3.484375 L 15.816406 3.484375 C 16.480469 3.484375 17.019531 4.023438 17.019531 4.683594 Z M 17.019531 4.800781 "
                />
                <path
                  stroke-width="0.5"
                  d="M 7.101562 17.546875 C 7.402344 17.546875 7.644531 17.304688 7.644531 17.003906 L 7.644531 10.898438 C 7.644531 10.597656 7.402344 10.355469 7.101562 10.355469 C 6.800781 10.355469 6.558594 10.597656 6.558594 10.898438 L 6.558594 17.003906 C 6.558594 17.304688 6.800781 17.546875 7.101562 17.546875 Z M 7.101562 17.546875 "
                />
                <path
                  stroke-width="0.5"
                  d="M 10.007812 17.546875 C 10.308594 17.546875 10.550781 17.304688 10.550781 17.003906 L 10.550781 10.898438 C 10.550781 10.597656 10.308594 10.355469 10.007812 10.355469 C 9.710938 10.355469 9.464844 10.597656 9.464844 10.898438 L 9.464844 17.003906 C 9.464844 17.304688 9.710938 17.546875 10.007812 17.546875 Z M 10.007812 17.546875 "
                />
                <path
                  stroke-width="0.5"
                  d="M 12.917969 17.546875 C 13.214844 17.546875 13.457031 17.304688 13.457031 17.003906 L 13.457031 10.898438 C 13.457031 10.597656 13.214844 10.355469 12.917969 10.355469 C 12.617188 10.355469 12.375 10.597656 12.375 10.898438 L 12.375 17.003906 C 12.375 17.304688 12.617188 17.546875 12.917969 17.546875 Z M 12.917969 17.546875 "
                />
              </g>
            </svg>
          </button>
        </template>
      </span>
    </div>
    {{ comment.message }}

    <!-- {{ comment }} -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import 'moment/dist/locale/vi';

export default {
  props: {
    comment: {
      type: Object,
      default: () => ({}),
    },
    taskId: {
      type: String,
      default: () => (''),
    },
  },
  computed: {
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
  },
  methods: {
    timeAgo (createdAt) {
      moment.updateLocale('vi');
      return moment(createdAt).fromNow();
    },
    showDelete (id) {
      return this.userId === id;
    },
    async deleteClick (commentId) {
      await this.$store.dispatch('task/removeComment', { token: this.token, commentId, taskId: this.taskId });
    },
  },
};
</script>
