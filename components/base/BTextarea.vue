<template>
  <textarea
    v-model="_value"
    class="w-full py-2 min-h-[68px] rounded-md"
    :class="[_disabled && 'bg-ui-shade-0 cursor-not-allowed']"
  ></textarea>
</template>

<script>
export default {
  name: 'BTextarea',
  model: {
    props: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
  },
  computed: {
    _value: {
      set(val) {
        this.$emit('change', val)
      },
      get() {
        return this.value
      },
    },
    _disabled() {
      return 'disabled' in this.$attrs && this.$attrs.disabled !== false
    },
  },
}
</script>
