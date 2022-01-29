<template>
  <component
    v-bind="$attrs"
    :is="_tag"
    :to="to"
    :class="[
      size === 'smaller' && 'h-[32px]',
      size === 'small' && 'h-[38px]',
      size === 'medium' && 'h-[42px]',
      size === 'large' && 'h-[48px]',

      variant === 'primary' && 'border bg-ui-primary text-white hover:bg-ui-primary-light active:bg-ui-primary-dark',
      variant === 'primary-naked' &&
        'border border-ui-primary text-ui-primary active:border-ui-primary-light active:text-ui-primary-light hover:text-ui-primary-dark hover:border-ui-primary-dark',
      variant === 'naked' &&
        'border border-ui-shade-40 text-ui-shade-80 hover:text-ui-shade-100 hover:border-ui-shade-80 active:text-ui-shade-60 active:border-ui-shade-40',
      variant === 'ghost' &&
        'border border-transparent text-ui-shade-80 hover:text-ui-shade-100 active:text-ui-shade-60',

      _disabled && 'hover:cursor-not-allowed',
      _disabled &&
        variant !== 'naked' &&
        variant !== 'ghost' &&
        '!bg-ui-shade-0 !text-ui-shade-40 !border !border-ui-shade-40',
      _disabled && variant === 'ghost' && '!text-ui-shade-20',
      _disabled && variant === 'naked' && 'text-ui-shade-20 hover:!border-ui-shade-40 hover:!text-ui-shade-20',
    ]"
    class="b-button px-4 rounded-lg font-medium flex justify-center items-center transition-all ease-in-out duration-300"
    v-on="$listeners"
  >
    <div v-if="loading" class="flex justify-center py-px">
      <IconSpinner />
    </div>
    <slot v-else />
  </component>
</template>

<script>
import IconSpinner from '~/components/icons/IconSpinner.vue'
export default {
  name: 'BButton',
  components: { IconSpinner },
  inheritAttrs: false,
  props: {
    to: {
      type: [String, Object],
      default: null,
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'primary-naked', 'naked', 'ghost'].includes(value),
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => ['smaller', 'small', 'medium', 'large'].includes(value),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _tag() {
      if ('href' in this.$attrs && this.$attrs.href !== false) return 'a'
      if (this.to) return 'NuxtLink'
      else return 'button'
    },
    _disabled() {
      return 'disabled' in this.$attrs && this.$attrs.disabled !== false
    },
  },
}
</script>
