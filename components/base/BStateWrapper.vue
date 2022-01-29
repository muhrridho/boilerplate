<template>
  <div class="b-state-wrapper">
    <slot v-if="state === 'loading'" name="loading">
      <div class="px-4 py-8">
        <IconSpinner class="m-auto w-10 h-10 text-ui-shade-80" />
      </div>
    </slot>
    <slot v-else-if="state === 'error'" name="error">
      <div class="flex flex-col justify-center items-center px-4 py-8 gap-4">
        <p class="text-ui-shade-80">{{ errorMessage }}</p>
        <BButton size="small" variant="naked" @click="$emit('retry')">Coba Lagi</BButton>
      </div>
    </slot>
    <slot v-else-if="state === 'empty'" name="empty">
      <p class="text-ui-shade-80 text-center py-8">{{ emptyMessage }}</p>
    </slot>
    <slot v-else-if="state === 'success'"></slot>
  </div>
</template>

<script>
import IconSpinner from '../icons/IconSpinner.vue'
import BButton from './BButton.vue'

export default {
  name: 'BStateWrapper',
  components: {
    IconSpinner,
    BButton,
  },
  props: {
    state: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'loading', 'error', 'empty'].includes(value),
    },
    errorMessage: {
      type: String,
      default: 'Gagal mengambil data, silahkan coba beberapa saat lagi.',
    },
    emptyMessage: {
      type: String,
      default: 'Data tidak ditemukan',
    },
  },
}
</script>
