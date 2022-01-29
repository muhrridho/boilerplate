<template>
  <div class="b-field" :class="[error && 'b-field--error']">
    <label v-if="label" :for="targetId" class="font-medium text-sm mb-1 block">
      {{ label }}
      <span v-if="required" class="text-red">*</span>
    </label>

    <div v-if="hint" class="text-sm text-ui-shade-80 mb-1">
      <slot name="hint">
        {{ hint }}
      </slot>
    </div>

    <slot></slot>

    <div v-if="error" class="text-sm text-ui-error mt-1">
      <slot name="error">
        {{ error }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BComponent',
  props: {
    targetId: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: [Boolean, String],
      default: false,
    },
    hint: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.b-field.b-field--error ::v-deep {
  .b-textfield input,
  .b-select,
  .b-textarea {
    @apply border-ui-error;
  }
}
</style>
