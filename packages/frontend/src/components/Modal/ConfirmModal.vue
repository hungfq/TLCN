<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
  >
    <span
      class="modal__title my-2"
    >
      <slot name="title" />
    </span>
    <div class="modal__content my-2">
      <slot :params="params" />
    </div>
    <div class="modal__action">
      <button
        class="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out ml-auto"
        @click="$emit('confirm')"
      >
        Xác nhận
      </button>
      <button
        class="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1"
        @click="$emit('cancel')"
      >
        Hủy
      </button>
    </div>
    <button
      class="modal__close"
      @click="close"
    >
      X
    </button>
  </vue-final-modal>
</template>
<script>
export default {
  name: 'ConfirmModal',
  inheritAttrs: false,
  emits: ['confirm', 'cancel'],
};
</script>
<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
