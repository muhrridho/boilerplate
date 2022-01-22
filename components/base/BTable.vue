<template>
  <table class="table-auto w-full">
    <thead>
      <tr class="border-b-2 border-ui-shade-40" :class="headClass">
        <template
          v-if="!selectedIndex.length || !$slots['table-select-header']"
        >
          <th
            v-for="column in normalizedColumns"
            :key="column.key"
            :class="[column.key === 'table-select' && 'pr-0']"
            class="px-3 py-3 text-left text-ui-shade-60 font-medium"
          >
            <BCheckbox
              v-if="column.key === 'table-select'"
              id="table-select-all"
              class="!-mt-1"
              :value="selectedIndex.length === items.length"
              @change="(val) => select(-1, val)"
            />
            <template v-else>
              <button
                v-if="column.sortable"
                class="flex items-center font-medium"
                :class="{ active: column.key === sort.by }"
                @click="sortBy(column.key)"
              >
                {{ getLabel(column) }}
                <component :is="getSortIcon(column.key)" class="ml-2" />
              </button>

              <span v-else>
                {{ getLabel(column) }}
              </span>
            </template>
          </th>
        </template>

        <template v-else>
          <th class="px-3 py-3 text-left text-ui-shade-60 pr-0">
            <BCheckbox
              id="table-select-all"
              class="-mt-1"
              :value="selectedIndex.length === items.length"
              @change="(val) => select(-1, val)"
            />
          </th>
          <th
            class="px-3 text-left text-ui-shade-60"
            :colspan="normalizedColumns.length - 1"
          >
            <slot name="table-select-header"> </slot>
          </th>
        </template>
      </tr>
    </thead>
    <tbody class="border-0">
      <tr
        v-for="(item, i) in items"
        :key="i"
        class="border-b text-sm text-ui-shade-60 align-top"
        :class="trClass"
      >
        <td
          v-for="column in normalizedColumns"
          :key="`${column.key}${i}`"
          class="px-3 py-4 text-left"
          :class="
            column.key === 'table-select'
              ? [...getTdClasses(column), 'pr-0']
              : getTdClasses(column)
          "
        >
          <BCheckbox
            v-if="column.key === 'table-select'"
            :id="`table-select-${i}`"
            class="mt-[-2px]"
            :value="selectedIndex.includes(i)"
            @change="(val) => select(i, val)"
          />
          <slot
            v-else
            :name="column.key"
            :index="i"
            :item="item"
            :value="getValue(column, item)"
          >
            {{ getValue(column, item) }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import IconSort from '../icons/IconSort.vue'
import IconSortAsc from '../icons/IconSortAsc.vue'
import IconSortDesc from '../icons/IconSortDesc.vue'

import BCheckbox from './BCheckbox.vue'

export default {
  name: 'BTable',
  components: { IconSort, IconSortAsc, IconSortDesc, BCheckbox },
  props: {
    /**
     * An array of `objects` or `string` that describe each column's header and data.
     * The object consists of `key, label, value, sortable, modifier, class, width`
     */
    columns: {
      type: Array,
      required: true,
    },

    /**
     * A raw array of objects that contains data to be displayed
     */
    items: {
      type: Array,
      required: true,
    },

    /**
     * An object that define sort orientation.
     * `by` is selected key, `asc` is Boolean for sort orientation.
     */
    sort: {
      type: Object,
      default: () => ({ by: null, asc: true }),
    },

    selectable: {
      type: Boolean,
      default: false,
    },

    // selected indexes
    selected: {
      type: Array,
      default: () => [],
    },

    /**
     * class for tr DOM on head
     */
    headClass: {
      type: [Array, String],
      default: '',
    },

    /**
     * class for each tr DOM
     */
    trClass: {
      type: [Array, String],
      default: '',
    },

    /**
     * class for each th DOM
     */
    thClass: {
      type: [Array, String],
      default: '',
    },
    /**
     * class for each td DOM
     */
    tdClass: {
      type: [Array, String],
      default: '',
    },
  },
  data: () => ({
    selectedIndex: [],
  }),
  computed: {
    normalizedColumns() {
      const columns = this.columns.map((col) =>
        typeof col === 'string' ? { key: col } : col
      )
      return this.selectable ? [{ key: 'table-select' }, ...columns] : columns
    },
  },
  watch: {
    items: {
      handler() {
        this.selectedIndex = []
      },
      deep: true,
    },
    selected: {
      handler() {
        this.selectedIndex = [...this.selected]
      },
      immediate: true,
    },
  },
  methods: {
    getTdClasses(column) {
      const classes =
        typeof this.tdClass === 'string'
          ? this.tdClass.split(' ')
          : [...this.tdClass]
      if (column.class) {
        classes.push(
          typeof column.class === 'string'
            ? column.class.split(' ')
            : [...column.class]
        )
      }
      return classes
    },
    getLabel(column) {
      return column.label || startCase(column.key)
    },
    getValue(column, item) {
      return (column.modifier || ((obj) => obj.value))({
        value: 'value' in column ? column.value : get(item, column.key),
        item,
      })
    },
    getSortIcon(key) {
      if (this.sort.by !== key) return 'IconSort'
      if (this.sort.asc) return 'IconSortAsc'
      return 'IconSortDesc'
    },
    sortBy(key) {
      const sort = Object.assign({}, { by: null, asc: true }, this.sort)
      if (sort.by === key && !sort.asc) {
        this.$emit('sort', { by: null })
      } else {
        this.$emit('sort', { by: key, asc: sort.by !== key ? true : !sort.asc })
      }
    },
    select(itemIndex, val) {
      if (itemIndex === -1) {
        this.selectedIndex = val ? [...Array(this.items.length).keys()] : []
      } else {
        const index = this.selectedIndex.indexOf(itemIndex)
        if (index === -1) {
          this.selectedIndex.push(itemIndex)
        } else {
          this.selectedIndex.splice(index, 1)
        }
      }
      this.$emit('select', this.selectedIndex)
    },
  },
}
</script>
