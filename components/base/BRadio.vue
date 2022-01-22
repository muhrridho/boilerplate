<template>
  <div class="flex">
    <input
      :id="id"
      v-model="_selected"
      v-bind="$attrs"
      :value="value"
      type="radio"
      class="w-[18px] h-[18px] mt-[3px] text-ui-primary border-2 border-ui-shade-40 focus:ring-ui-primary cursor-pointer"
    />
    <label
      v-if="label || $slots.default"
      :for="id"
      class="ml-2 cursor-pointer heading-tight text-ui-shade-100 font-medium"
    >
      <slot>
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'BRadio',
  inheritAttrs: false,
  model: {
    prop: 'selected',
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
      type: [Boolean, String, Number],
      required: true,
    },
    selected: {
      type: [Boolean, String, Number],
      required: true,
    },
  },
  computed: {
    _selected: {
      set(val) {
        this.$emit('change', val)
      },
      get() {
        return this.selected
      },
    },
  },
}
</script>
