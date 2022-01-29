<template>
  <div class="b-tab flex" :class="[isVertical && 'flex-col']">
    <ul class="b-tab__menu" :class="[isVertical && 'flex border-b-2 border-ui-shade-40']">
      <li
        v-for="tab in tabs"
        :key="`menu-${kebabCase(tab)}`"
        :class="`b-tab__menu-item--${kebabCase(tab)}`"
        class="b-tab__menu-item"
      >
        <a
          :href="`#${kebabCase(tab)}`"
          :class="[
            isActive(tab) && '!text-ui-primary',
            isVertical && 'px-10 border-b-[3px] border-transparent mb-[-2px] text-center',
            isVertical && isActive(tab) && 'text-ui-primary border-ui-primary',
            ...menuClass,
          ]"
          class="b-tab__menu-link block px-4 py-2 m-0 font-medium text-ui-shade-60 hover:text-ui-shade-80"
          @click.prevent="onMenuClick(tab)"
          >{{ tab }}</a
        >
      </li>
    </ul>
    <div class="b-tab__content p-3 flex-1">
      <div
        v-for="tab in tabs"
        :key="`content-${kebabCase(tab)}`"
        :class="`b-tab__content--${kebabCase(tab)}`"
        class="b-tab__content"
      >
        <slot v-if="isActive(tab)" :name="tab"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import kebabCase from 'lodash/kebabCase'

export default {
  name: 'BTabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: String,
      default: null,
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value),
    },
    menuClass: {
      type: Array,
      default: () => [],
    },
    withHash: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    vmActiveTab: null,
  }),
  computed: {
    isVertical() {
      return this.direction === 'vertical'
    },
  },
  watch: {
    activeTab: {
      handler() {
        if (this.vmActiveTab && this.vmActiveTab === this.activeTab) return
        this.vmActiveTab = this.activeTab || this.tabs[0]
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.withHash && window.location.hash) this.vmActiveTab = `${window.location.hash}`.replace('#', '')
  },
  methods: {
    isActive(tab) {
      return this.vmActiveTab === tab || this.vmActiveTab === kebabCase(tab)
    },
    onMenuClick(newTab) {
      this.vmActiveTab = newTab
      this.$emit('change', newTab)
      if (this.withHash) window.location.hash = `#${kebabCase(newTab)}`
    },
    kebabCase,
  },
}
</script>
