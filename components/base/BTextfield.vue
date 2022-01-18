<template>
  <div class="b-textfield flex relative">
    <div
      v-if="prefix || $slots.prefix"
      ref="prefix"
      class="absolute inset-y-0 px-2 pt-[1px] left-1 flex items-center justify-center font-bold"
    >
      <slot name="prefix">{{ prefix }}</slot>
    </div>
    <input
      v-bind="$attrs"
      v-model="_value"
      v-on="inputListeners"
      :type="_type === 'number' ? 'text' : _type"
      :class="[
        size === 'small' && 'h-[38px]',
        size === 'medium' && 'h-[42px]',
        size === 'large' && 'h-[48px]',

        _disabled && 'bg-ui-shade-0 cursor-not-allowed',
      ]"
      class="w-full px-3 p-0 rounded-md"
      ref="inputElm"
    />
    <div
      v-if="type === 'password'"
      class="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer"
      @click="isPasswordRevealed = !isPasswordRevealed"
    >
      <IconEye
        :class="[
          isPasswordRevealed && 'text-ui-primary',
          !isPasswordRevealed && 'text-ui-shade-40',
        ]"
      />
    </div>
    <div
      v-if="suffix || $slots.suffix"
      ref="suffix"
      class="absolute inset-y-0 right-1 flex items-center justify-center font-bold"
    >
      <slot name="suffix">{{ suffix }}</slot>
    </div>
  </div>
</template>

<script>
import IconEye from '~/components/icons/IconEye.vue'

export default {
  name: 'BTextfield',
  components: { IconEye },
  inheritAttrs: false,
  model: {
    props: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    type: {
      type: String,
      default: 'text', // [text, number, password]
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
    allowNegative: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: null,
    },
    suffix: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    isMinusPending: false,
    isPasswordRevealed: false,
  }),
  computed: {
    _value: {
      set(val) {
        this.updateChanges(val)
      },
      get() {
        if (this.type === 'number') {
          return this.isMinusPending ? '-' : this.delimiter(this.value)
        }
        return this.value
      },
    },
    _type() {
      return this.type === 'number' || this.isPasswordRevealed
        ? 'text'
        : this.type
    },
    _disabled() {
      return 'disabled' in this.$attrs && this.$attrs.disabled !== false
    },
    inputListeners() {
      const vm = this
      return Object.assign({}, this.$listeners, {
        change(event) {
          vm.updateChanges(event.target.value)
        },
      })
    },
  },
  mounted() {
    if (this.$slots.prefix || this.prefix) {
      this.$refs.inputElm.style.paddingLeft = `${this.$refs.prefix.clientWidth}px`
    }
    if (this.$slots.suffix || this.suffix) {
      this.$refs.inputElm.style.paddingRight = `${
        this.$refs.suffix.clientWidth + 8
      }px`
    }
  },
  methods: {
    updateChanges(val) {
      if (this.type !== 'number') {
        this.$emit('change', val)
      } else {
        this.isMinusPending = false

        if (val === '-' && this.allowNegative) {
          this.isMinusPending = true
          this.$emit('change', null)
          return
        }

        const numericValue = this.replaceNonNumeric(val)
        const value = `${numericValue}`
          ? Number(numericValue) || 0
          : numericValue
        this.$emit('change', value)
      }
      this.$forceUpdate()
    },
    replaceNonNumeric(str) {
      return str ? `${str}`.replace(/(?!^)-/g).replace(/[^-0-9]/g, '') : str
    },
    delimiter(val) {
      if (val === '-') return '-'
      return val
        ? new Intl.NumberFormat('id').format(this.replaceNonNumeric(val))
        : val
    },
  },
}
</script>
