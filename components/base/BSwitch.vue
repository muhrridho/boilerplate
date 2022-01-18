<template>
  <div
    class="b-switch flex items-center h-12"
    :class="[_disabled && 'b-switch--disabled']"
  >
    <label
      class="w-[42px] h-6 p-[2px] relative mr-2 border rounded-full overflow-hidden cursor-pointer transition-bg"
      role="checkbox"
    >
      <input
        v-model="_value"
        v-bind="$attrs"
        :id="id"
        :disabled="_disabled"
        :true-value="trueValue"
        :false-value="falseValue"
        :class="[_disabled && '!cursor-not-allowed']"
        class="b-switch__input absolute top-0 left-0 w-full h-full border-0 transition-all bg-ui-shade-40 cursor-pointer"
        type="checkbox"
      />
      <span
        class="switch-toggle left[3px] top[3px] absolute h-[18px] w-[18px] flex justify-center items-center rounded-full shadow-lg transition-all bg-white"
        :class="[_disabled && 'cursor-not-allowed']"
      ></span>
    </label>
    <label
      v-if="label || $slots.default"
      :for="id"
      class="font-medium cursor-pointer"
      :class="[
        _checked && 'text-ui-primary',
        !_checked && 'text-ui-shade-60',
        _disabled && !_checked && '!cursor-not-allowed !text-ui-shade-80',
        _disabled && _checked && '!cursor-not-allowed !text-ui-primary-dark',
      ]"
    >
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'BSwitch',
  inheritAttrs: false,
  model: {
    props: 'value',
    event: 'change',
  },
  props: {
    value: {
      default: '',
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    trueValue: {
      default: true,
    },
    falseValue: {
      default: false,
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
      return [true, 'true'].includes(this.disabled)
    },
    _checked() {
      return this._value === this.trueValue
    },
  },
}
</script>

<style lang="scss" scoped>
.b-switch {
  &__input:checked {
    background-image: none;
    @apply bg-ui-primary;
  }
  &__input:checked + .switch-toggle {
    transform: translateX(100%);
  }

  &--disabled {
    .b-switch__input:checked {
      @apply bg-ui-primary-dark;
    }
  }
}
</style>
