<template>
  <div
    v-if="active"
    class="b-dialog fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-40 z-40" @click="hide"></div>
    <div
      class="relative bg-white m-4 z-50 p-6 rounded-2xl max-h-[90vh] max-w-[90%] overflow-auto"
      :class="dialogClass"
    >
      <div v-if="title || closeButton" class="relative my-4 text-ui-shade-80">
        <h4 class="text-2xl text-center font-bold">
          {{ title }}
        </h4>
        <button v-if="closeButton" class="absolute right-2 top-2" @click="hide">
          <IconClose />
        </button>
      </div>
      <slot></slot>
      <div v-if="$slots.footer" class="flex justify-center gap-4 mt-6">
        <slot name="footer"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
import IconClose from '../icons/IconClose.vue'

export default {
  name: 'BDialog',
  inheritAttrs: false,
  components: { IconClose },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    dialogClass: {
      type: String,
      default: '',
    },
    closeButton: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
  watch: {
    active: {
      handler() {
        if (process.server) return
        if (this.active) {
          document.documentElement.style.overflowY = 'hidden'
        } else {
          document.documentElement.style.overflowY = ''
        }
      },
      immediate: true,
    },
  },
  methods: {
    show() {
      this.$emit('update:active', true)
    },
    hide() {
      this.$emit('update:active', false)
    },
  },
}
</script>
