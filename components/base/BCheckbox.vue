<template>
  <div class="flex">
    <input
      v-model="_value"
      v-bind="$attrs"
      :id="id"
      :disabled="_disabled"
      :true-value="trueValue"
      :false-value="falseValue"
      type="checkbox"
      class="w-[18px] h-[18px] mt-[3px] text-ui-primary rounded-sm border-2 border-ui-shade-40 focus:ring-ui-primary cursor-pointer"
      :class="[
        _disabled &&
          !_checked &&
          '!text-ui-shade-20 !bg-ui-shade-20 !cursor-not-allowed',
        _disabled && _checked && '!text-ui-shade-40',
      ]"
    />
    <label
      v-if="label || $slots.default"
      :for="id"
      :class="[_disabled && '!cursor-not-allowed text-ui-shade-80']"
      class="ml-2 cursor-pointer heading-tight"
    >
      <slot>
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'BCheckbox',
  inheritAttrs: false,
  model: {
    props: 'value',
    event: 'change',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      required: true,
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
