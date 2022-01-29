<template>
  <div
    class="b-image-upload w-[120px] h-[120px] bg-ui-shade-60 relative flex items-center justify-center rounded overflow-hidden"
  >
    <div
      v-if="isEmpty"
      class="text-white flex flex-col items-center justify-center absolute inset-0 cursor-pointer"
      @click="$refs.input.click()"
    >
      <IconCamera />
      <span class="text-xs pt-1">Tambah</span>
      <input ref="input" class="hidden" type="file" :accept="accept" @change="onChange" />
    </div>
    <template v-else>
      <button
        class="absolute right-1 top-1 p-1 bg-opacity-10 bg-black rounded-full text-white cursor-pointer z-10 hover:text-ui-shade-0"
        @click="onClear"
      >
        <IconClose class="w-3 h-3" />
      </button>
      <div
        v-if="_value.content.includes('application/pdf')"
        class="text-white flex flex-col items-center justify-center absolute inset-0 p-2 text-center"
      >
        <IconNote class="text-white w-12 h-12" />
        <p class="text-xs leading-3 overflow-ellipsis overflow-hidden line-clamp-2 mt-4 break-all">
          {{ _value.name }}
        </p>
      </div>
      <img v-else :src="value.content" class="absolute inset-0 object-cover w-full h-full" />
    </template>
  </div>
</template>

<script>
import IconCamera from '../icons/IconCamera.vue'
import IconNote from '../icons/IconNote.vue'
import IconClose from '../icons/IconClose.vue'

const defaultContent = { name: null, content: null }
export default {
  name: 'BImageUpload',
  components: {
    IconCamera,
    IconNote,
    IconClose,
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
      default: 'image/x-png,image/jpg,image/jpeg,application/pdf',
    },
    maxSize: {
      type: Number,
      default: 0, // in Mb; 0 for unset
    },
    mustSquare: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isSquare: true,
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
          const img = new Image()
          img.src = this._value?.content
          const vm = this
          img.onload = function () {
            if (this.mustSquare && this.width !== this.height) vm.$emit('not-square')
          }

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
