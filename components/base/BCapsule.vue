<template>
  <div class="b-capsule flex gap-2">
    <BButton
      v-for="(option, i) in options"
      :key="`capsule-${i}`"
      :variant="_value === getValue(option) ? 'primary-naked' : 'naked'"
      :size="size"
      class="rounded-full border-2 font-normal"
      @click="onClick(option)"
      >{{ getValue(option) }}</BButton
    >
  </div>
</template>

<script>
import BButton from './BButton.vue'

export default {
  name: 'BCapsule',
  components: { BButton },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Number, String, Boolean],
      default: null,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['smaller', 'small', 'medium', 'large'].includes(value),
    },
    options: {
      type: Array,
      required: true,
    },
    required: {
      type: [Boolean, String],
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
    _required() {
      return [true, 'true'].includes(this.required)
    },
  },
  methods: {
    onClick(option) {
      this._value = this._value === this.getValue(option) && !this._required ? null : this.getValue(option)
    },
    getValue(option) {
      return typeof option === 'object' ? option.key : option
    },
  },
}
</script>
