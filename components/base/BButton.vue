<template>
  <component
    v-bind="$attrs"
    v-on="$listeners"
    :is="_tag"
    :class="[
      size === 'small' && 'h-[38px]',
      size === 'medium' && 'h-[42px] text-lg',
      size === 'large' && 'h-[48px] text-xl',

      variant === 'primary' &&
        'border bg-ui-primary text-ui-white hover:bg-ui-primary-light active:bg-ui-primary-dark',
      variant === 'naked' &&
        'border border-ui-shade-40 text-ui-shade-80 hover:border-ui-shade-60 active:text-ui-shade-60',
      variant === 'ghost' &&
        'border border-transparent text-ui-shade-80 hover:text-ui-shade-100 active:text-ui-shade-60',

      _disabled &&
        '!bg-ui-shade-20 !text-ui-shade-40 !border !border-ui-shade-40 hover:cursor-not-allowed',
    ]"
    class="b-button w-full px-4 rounded-md font-medium flex justify-center items-center"
  >
    <div v-if="loading" class="flex justify-center py-px">
      <IconSpinner class="animate-spin" />
    </div>
    <slot v-else />
  </component>
</template>

<script>
import IconSpinner from '~/components/icons/IconSpinner.vue'
export default {
  name: 'BButton',
  inheritAttrs: false,
  components: { IconSpinner },
  props: {
    tag: {
      type: String,
      default: 'button', // button, a
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'naked', 'ghost'].includes(value),
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _tag() {
      return 'href' in this.$attrs && this.$attrs.href !== false
        ? 'a'
        : 'button'
    },
    _disabled() {
      return 'disabled' in this.$attrs && this.$attrs.disabled !== false
    },
  },
}
</script>
