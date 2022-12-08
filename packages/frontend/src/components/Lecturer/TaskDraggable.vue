<template>
  <div class="flex  overflow-x-scroll max-w-full">
    <div class="flex p-2 pr-0">
      <div
        v-for="column in columns"
        :key="column.title"
        class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
      >
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
          {{ column.title }}
        </p>
        <VueDraggableNext
          :list="column.tasks"
          :animation="200"
          ghost-class="ghost-card"
          group="tasks"
        >
          <task-card
            v-for="(task) in column.tasks"
            :key="task.id"
            :task="task"
            class="mt-3 cursor-move"
          />
        </VueDraggableNext>
      </div>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
import TaskCard from './TaskCard.vue';

export default {
  name: 'TaskDraggable',
  components: {
    TaskCard,
    VueDraggableNext,
  },
  data () {
    return {
      columns: [
        {
          title: 'PENDING',
          tasks: [
            {
              id: 1,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
            {
              id: 2,
              title: 'Provide documentation on integrations',
              date: 'Sep 12',
            },
            {
              id: 3,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design',
            },
            {
              id: 4,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
            {
              id: 5,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
          ],
        },
        {
          title: 'TO DO',
          tasks: [
            {
              id: 6,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design',
            },
            {
              id: 7,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
            {
              id: 8,
              title: 'Provide documentation on integrations',
              date: 'Sep 12',
              type: 'Backend',
            },
          ],
        },
        {
          title: 'IN PROGRESS',
          tasks: [
            {
              id: 9,
              title: 'Provide documentation on integrations',
              date: 'Sep 12',
            },
            {
              id: 10,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design',
            },
          ],
        },
        {
          title: 'DONE',
          tasks: [
            {
              id: 14,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
            {
              id: 15,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design',
            },
            {
              id: 16,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.column-width {
  min-width: 280px;
  width: 280px;
}
/* Unfortunately @apply cannot be setup in code sandbox,
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>
