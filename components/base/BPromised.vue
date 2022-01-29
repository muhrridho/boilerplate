<template>
  <BStateWrapper
    class="b-promised"
    :state="_state"
    :error-message="errorMessage"
    :empty-message="emptyMessage"
    @retry="$emit('retry')"
  >
    <template v-if="_state === 'loading' && $slots.loading" slot="loading">
      <slot name="loading"></slot>
    </template>
    <template v-if="_state === 'error' && $slots.error" slot="error">
      <slot name="error"></slot>
    </template>
    <template v-if="_state === 'empty' && $slots.empty" slot="empty">
      <slot name="empty"></slot>
    </template>
    <template v-if="_state === 'success'">
      <slot :data="(response || {}).data" :meta="(response || {}).meta"> </slot>
    </template>
  </BStateWrapper>
</template>

<script>
import BStateWrapper from './BStateWrapper.vue'

export default {
  name: 'BPromised',
  components: {
    BStateWrapper,
  },
  props: {
    /* eslint-disable-next-line */
    promise: {
      // type: [Promise, Object
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

    isEmpty: {
      type: Boolean,
      default: null,
    },
    emptyMessage: {
      type: String,
      default: 'Data tidak ditemukan',
    },
  },
  data: () => ({
    state: 'loading',
    response: null,
    errorMessage: null,
  }),
  computed: {
    _isEmpty() {
      return this.isEmpty === null ? this.scoped && !this.response?.data?.length : this.isEmpty
    },
    _state() {
      return this.state === 'success' ? (this._isEmpty ? 'empty' : this.state) : this.state
    },
  },
  watch: {
    promise: {
      handler() {
        this.init()
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      this.state = 'loading'
      this.response = null
      this.errorMessage = null

      this.promise
        .then((response) => {
          this.state = 'success'
          if (this.scoped) this.response = response
          this.$emit('success', response)
        })
        .catch((error) => {
          this.errorMessage = this.errorHandler(error) || this.defaultErrorMessage
          this.state = 'error'
          this.$emit('error', error)
        })
    },
  },
}
</script>
