<template>
  <div class="b-input-range flex items-center space-x-1">
    <BButton
      :disabled="(min || min === 0) && val <= min"
      :size="size"
      variant="naked"
      class="flex flex-shrink-0 flex-grow-0 justify-center items-center w-[42px] !p-0 rounded-full text-2xl"
      @click="val = value - 1"
    >
      -
    </BButton>
    <BTextfield
      v-model="val"
      :allowNegative="this.min < 0"
      :input-class="[
        'min-w-[20px]',
        'text-center',
        '!rounded-full',
        'w-20',
        ...inputClass,
      ]"
      :size="size"
      type="number"
    />
    <BButton
      :disabled="(max || max === 0) && val >= max"
      :size="size"
      variant="naked"
      class="flex flex-shrink-0 flex-grow-0 justify-center items-center w-[42px] !p-0 rounded-full text-2xl"
      @click="val = value + 1"
    >
      +
    </BButton>
  </div>
</template>

<script>
import BButton from './BButton.vue'
import BTextfield from './BTextfield.vue'
export default {
  name: 'SipInputRange',
  components: { BButton, BTextfield },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: null,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
    inputClass: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentType: this.type,
    }
  },
  computed: {
    val: {
      set(val) {
        if ((this.max || this.max === 0) && val > this.max)
          this.$emit('change', this.max)
        // else if (((this.min || this.min === 0) && val < this.min) || !this.min)
        else if (val < this.min && this.min !== null)
          this.$emit('change', this.min || 0)
        else this.$emit('change', val)
      },
      get() {
        return this.value
      },
    },
  },
  methods: {},
}
</script>
