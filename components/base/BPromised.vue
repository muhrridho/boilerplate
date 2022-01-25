<template>
  <div class="b-promised">
    <div
      v-if="state === 'pending'"
      class="flex justify-center items-center px-4 py-16"
    >
      <IconSpinner class="w-10 h-10 text-ui-shade-80" />
    </div>
    <div
      v-else-if="state === 'rejected'"
      class="flex flex-col justify-center items-center px-4 py-16 gap-4"
    >
      <p class="text-ui-shade-80">{{ defaultErrorMessage }}</p>
      <BButton size="small" variant="naked" @click="$emit('retry')"
        >Coba Lagi</BButton
      >
    </div>
    <slot v-else-if="state === 'resolved'"></slot>
  </div>
</template>

<script>
import IconSpinner from '../icons/IconSpinner.vue'
import BButton from './BButton.vue'

export default {
  name: 'BPromised',
  components: {
    IconSpinner,
    BButton,
  },
  props: {
    promise: {
      type: [Promise, Object],
      required: true,
    },
    defaultErrorMessage: {
      type: String,
      default: 'Gagal mengambil data, silahkan coba beberapa saat lagi.',
    },
  },
  data: () => ({
    state: 'pending',
  }),
  watch: {
    promise: {
      handler() {
        this.init()
      },
      // deep: true,
      immediate: true,
    },
  },
  methods: {
    init() {
      this.state = 'pending'
      this.promise
        .then((response) => {
          this.state = 'resolved'
          this.$emit('resolved', response)
        })
        .catch((error) => {
          this.state = 'rejected'
          this.$emit('rejected', error)
        })
    },
  },
}
</script>
