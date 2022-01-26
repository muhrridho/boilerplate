<template>
  <div class="b-promised">
    <slot v-if="state === 'pending'" name="pending">
      <div class="flex justify-center items-center px-4 py-16">
        <IconSpinner class="w-10 h-10 text-ui-shade-80" />
      </div>
    </slot>
    <slot v-else-if="state === 'rejected'" name="rejected">
      <div class="flex flex-col justify-center items-center px-4 py-16 gap-4">
        <p class="text-ui-shade-80">{{ errorMessage }}</p>
        <BButton size="small" variant="naked" @click="$emit('retry')">Coba Lagi</BButton>
      </div>
    </slot>
    <slot v-else-if="state === 'resolved'" :data="(response || {}).data" :meta="(response || {}).meta"></slot>
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
    errorHandler: {
      type: Function,
      /* eslint-disable-next-line  */
      default: (err) => null,
    },
    defaultErrorMessage: {
      type: String,
      default: 'Gagal mengambil data, silahkan coba beberapa saat lagi.',
    },

    // wheter response will be served on slot-scoped value
    scoped: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    state: 'pending',
    response: null,
    errorMessage: null,
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
      this.response = null
      this.errorMessage = null

      this.promise
        .then((response) => {
          this.state = 'resolved'
          if (this.scoped) this.response = response
          this.$emit('resolved', response)
        })
        .catch((error) => {
          this.errorMessage = this.errorHandler(error) || this.defaultErrorMessage
          this.state = 'rejected'
          this.$emit('rejected', error)
        })
    },
  },
}
</script>
