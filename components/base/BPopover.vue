<template>
  <div
    ref="wrapper"
    class="BPopover relative w-fit-content"
    @mouseleave="onMouseLeave"
    @mouseenter="onMouseEnter"
  >
    <div @click="onClick">
      <slot name="label">
        <BButton
          :variant="active ? 'primary-naked' : 'naked'"
          class="rounded-full font-normal"
          >{{ label }}</BButton
        >
      </slot>
    </div>
    <transition name="fade-dropdown">
      <div
        v-if="active"
        class="absolute bg-white p-4 rounded-xl z-20 mt-2 shadow-ui transition duration-100 ease-in-out"
        :class="{
          'translate-x-1/2 right-1/2': position === 'center',
          'left-0': position === 'left',
          'right-0': position === 'right',
        }"
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
    onClieckOutside(e) {
      if (!this.$refs.wrapper.contains(e.target)) {
        this.close()
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
      document.addEventListener('click', this.onClieckOutside)
    },
    clearEventListener() {
      document.removeEventListener('click', this.onClieckOutside)
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
