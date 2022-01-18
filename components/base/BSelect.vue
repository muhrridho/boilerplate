<template>
  <select
    v-model="_value"
    :class="[
      size === 'small' && 'h-[38px]',
      size === 'medium' && 'h-[42px]',
      size === 'large' && 'h-[48px]',

      _disabled && 'bg-ui-shade-0 cursor-not-allowed',
    ]"
    class="b-select block border border-ui-shade-40 rounded-md w-full"
    required
  >
    <option v-if="placeholder" :value="null" disabled selected hidden>
      {{ placeholder }}
    </option>
    <option
      v-for="(option, i) in options"
      :key="`option-${i}`"
      :value="typeof option === 'object' ? option.key : option"
    >
      {{ typeof option === 'object' ? option.value : option }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BSelect',
  model: {
    props: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => ['small', 'medium', 'large'].includes(value),
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

<style lang="scss" scoped>
.b-select {
  option {
    @apply text-ui-black;
  }
  &:required:invalid {
    @apply text-ui-primary;
  }
}
</style>
