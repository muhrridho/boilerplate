<template>
  <div
    class="b-file-upload bg-ui-shade-0 p-8 h-[240px] flex flex-col items-center justify-center rounded overflow-hidden border border-dashed border-ui-shade-60"
  >
    <div class="flex gap-2 items-center">
      <IconFileUpload class="text-ui-primary" :class="[isEmpty && 'w-16 h-16', !isEmpty && 'w-8 h-8']" />
      <p v-if="!isEmpty" class="font-medium break-all">{{ _value.name }}</p>
    </div>
    <p v-if="description || $slots.description" class="mt-6 text-sm text-ui-shade-60">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
    <BButton variant="naked" size="small" class="w-[240px] bg-white mt-2" @click="$refs.input.click()">{{
      isEmpty ? 'Pilih File' : 'Ubah File'
    }}</BButton>
    <input ref="input" class="hidden" type="file" :accept="accept" @change="onChange" />
  </div>
</template>

<script>
import IconFileUpload from '../icons/IconFileUpload.vue'
import BButton from './BButton.vue'

const defaultContent = { name: null, content: null }
export default {
  name: 'BFileUpload',
  components: {
    BButton,
    IconFileUpload,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Object,
      default: () => defaultContent,
      validator: (value) => 'name' in value && 'content' in value,
    },
    accept: {
      type: String,
      default: null,
    },
    maxSize: {
      type: Number,
      default: 0, // in Mb; 0 for unset
    },
    description: {
      type: String,
      default: 'Pilih file yang ingin diunggah',
    },
  },
  data: () => ({
    isSizeExceeded: false,
  }),
  computed: {
    _value: {
      set(val) {
        this.$emit('change', val)
      },
      get() {
        return this.value
      },
    },
    isEmpty() {
      return !this.value?.content
    },
  },
  methods: {
    onChange(e) {
      const data = { ...defaultContent }
      const files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      const file = files[0]
      const size = file.size && file.size / Math.pow(1024, 2)

      // check file max size
      if (this.maxSize && size > this.maxSize) {
        this.$emit('size-exceeded')
        return
      }

      // update file
      data.name = file.name
      const reader = new FileReader()

      reader.onload = (e) => {
        const dataURI = e.target.result

        if (dataURI) {
          data.content = dataURI
          this._value = data
        }
      }

      // read blob url from file data
      reader.readAsDataURL(file)
    },
    onClear() {
      this._value = { ...defaultContent }
    },
  },
}
</script>
