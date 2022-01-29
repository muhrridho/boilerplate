<template>
  <div ref="wrapper" class="BPopover relative" @mouseleave="onMouseLeave" @mouseenter="onMouseEnter">
    <div v-if="label || $slots.label || $slots['label-button']" ref="label" @click="onClick">
      <slot name="label" @click.prevent="onClick">
        <BButton :variant="active ? 'primary-naked' : 'naked'" class="rounded-full font-normal">
          <slot name="label-button">
            {{ label }}
          </slot>
        </BButton>
      </slot>
    </div>
    <transition name="fade-dropdown">
      <div
        v-if="active && $slots.default"
        class="absolute bg-white rounded-xl z-20 mt-2 shadow-ui transition duration-100 ease-in-out"
        :class="[
          position === 'center' && 'translate-x-1/2 right-1/2',
          position === 'left' && 'left-0',
          position === 'right' && 'right-0',
          ...contentClass,
        ]"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import BButton from './BButton.vue'

export default {
  name: 'BPopover',
  components: { BButton },
  props: {
    label: {
      type: String,
      default: null,
    },
    trigger: {
      type: String,
      default: 'click',
      validator: (value) => ['click', 'hover'].includes(value),
    },
    position: {
      type: String,
      default: 'left',
      validator: (value) => ['center', 'left', 'right'].includes(value),
    },
    delay: {
      type: Number,
      default: 200,
    },
    contentClass: {
      type: Array,
      default: () => [],
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    active: false,
    timer: null,
  }),
  watch: {
    active() {
      this.$emit(this.active ? 'open' : 'close')
    },
  },
  mounted() {
    if (this.trigger === 'click') {
      this.addEventListener()
    }
  },
  destroyed() {
    if (this.trigger === 'click') {
      this.clearEventListener()
    }
  },
  methods: {
    open() {
      this.addEventListener()
      this.active = true
    },
    close() {
      this.clearEventListener()
      this.active = false
    },
    onClick() {
      if (this.trigger === 'click') this.open()
    },
    onClickOutside(e) {
      const labelClicked = this.$refs.label && !this.$refs.label.contains(e.target)

      if ((!this.$refs.wrapper.contains(e.target) || this.closeOnClick) && (labelClicked || !this.$refs.label)) {
        setTimeout(this.close, 100)
      }
    },
    onMouseEnter() {
      if (this.trigger === 'hover') {
        clearTimeout(this.timer)
        this.open()
      }
    },
    onMouseLeave() {
      if (this.trigger === 'hover') {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.close()
        }, this.delay)
      }
    },
    addEventListener() {
      document.addEventListener('mousedown', this.onClickOutside)
    },
    clearEventListener() {
      document.removeEventListener('mousedown', this.onClickOutside)
    },
  },
}
</script>
<style lang="scss" scoped>
.fade-dropdown-enter-active,
.fade-dropdown-leave-active {
  transition: opacity 150 ease-in-out;
}
.fade-dropdown-enter, .fade-dropdown-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
