<template>
  <div
    class="b-tag h-5 pt-[1px] px-2 text-xs rounded inline-block"
    :class="{
      'bg-ui-primary text-white': variant === 'primary',
      'bg-white text-ui-shade-80 border border-ui-shade-40': variant === 'naked',
      'bg-ui-shade-80 text-white': variant === 'default',
    }"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script>
export default {
  name: 'BTag',
  props: {
    label: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['primary', 'naked', 'default'].includes(value),
    },
  },
}
</script>
