<template>
  <ul class="b-pagination flex justify-center items-center gap-1">
    <li v-for="(link, i) in displayedLinks" :key="`link-${i}`">
      <div v-if="link.page === 'dot'" class="px-1 text-ui-shade-80">...</div>
      <BButton
        v-else
        :href="`${linkFormat.replace('##', translatePage(link.page))}`"
        :variant="link.active ? 'primary' : 'ghost'"
        :disabled="link.disabled === true"
        :class="[link.disabled && '!bg-white !border-0']"
        size="smaller"
        class="!px-[11px]"
        @click.prevent="$emit('change', translatePage(link.page))"
      >
        <IconChevron
          v-if="link.page === 'prev' || link.page === 'next'"
          :direction="link.page === 'prev' ? 'left' : 'right'"
          :class="[link.disabled ? 'text-ui-shade-40' : 'text-ui-primary']"
          class="w-2"
        />
        <template v-else>{{ link.page }}</template>
      </BButton>
    </li>
  </ul>
</template>

<script>
import IconChevron from '../icons/IconChevron.vue'
import BButton from './BButton.vue'

export default {
  name: 'BPagination',
  components: { BButton, IconChevron },
  props: {
    page: {
      type: Number,
      required: false,
      default: 1,
    },
    total: {
      type: Number,
      required: false,
      default: 1000,
    },
    limit: {
      type: Number,
      default: 10,
    },
    maxLinks: {
      type: Number,
      default: 7,
    },

    // format url; will replace ## with target page; for SEO friendly
    linkFormat: {
      type: String,
      default: '?page=##',
    },
  },
  computed: {
    numOfPages() {
      return Math.ceil(this.total / this.limit)
    },
    displayedLinks() {
      const displayedLinks = []

      let start = Math.max(1, this.page - Math.floor((this.maxLinks - 1) / 2))
      const end = Math.min(start + this.maxLinks - 1, this.numOfPages)
      start = Math.max(1, start - (this.maxLinks - 1 - (end - start)))

      for (let i = start; i <= end; i++) {
        displayedLinks.push({ page: i, active: i === this.page })
      }

      const isFirstPage = this.page === 1
      if (start > 2) {
        displayedLinks.unshift({ page: 'dot' })
        displayedLinks.unshift({ page: 1, active: isFirstPage })
      }
      displayedLinks.unshift({ page: 'prev', disabled: isFirstPage })

      const isLastPage = this.page === this.numOfPages
      if (this.numOfPages - end > 2) {
        displayedLinks.push({ page: 'dot' })
        displayedLinks.push({ page: this.numOfPages, active: isLastPage })
      }
      displayedLinks.push({ page: 'next', disabled: isLastPage })

      return displayedLinks
    },
  },
  methods: {
    translatePage(page) {
      if (page === 'prev') return Math.max(1, this.page - 1)
      if (page === 'next') return Math.min(this.numOfPages, this.page + 1)
      return page
    },
  },
}
</script>
