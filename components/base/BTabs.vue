<template>
  <div class="b-tab flex">
    <ul class="b-tab__menu">
      <li
        v-for="tab in tabs"
        :key="`menu-${kebabCase(tab)}`"
        :class="`b-tab__menu-item--${kebabCase(tab)}`"
        class="b-tab__menu-item"
      >
        <a
          :href="`#${kebabCase(tab)}`"
          :style="`width: ${menuWidth}`"
          :class="[vmActiveTab === tab && 'text-ui-primary']"
          class="b-tab__menu-link h-[48px] px-4 flex items-center font-medium hover:bg-ui-shade-0"
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
        <slot v-if="vmActiveTab === tab" :name="tab"></slot>
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
    menuWidth: {
      type: String,
      default: 'auto',
    },
  },
  data: () => ({
    vmActiveTab: null,
  }),
  watch: {
    activeTab: {
      handler() {
        if (this.vmActiveTab && this.vmActiveTab === this.activeTab) return
        this.vmActiveTab = this.activeTab || this.tabs[0]
      },
      immediate: true,
    },
  },
  methods: {
    onMenuClick(newTab) {
      this.vmActiveTab = newTab
      this.$emit('change', newTab)
    },
    kebabCase,
  },
}
</script>
