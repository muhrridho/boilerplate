<template>
  <div class="container py-8">
    <h1 class="text-4xl">Components Page</h1>
    <BTabs
      :tabs="componentsList"
      :active-tab="componentsList[componentsList.length - 1]"
      :with-hash="true"
      direction="horizontal"
      class="mt-8"
    >
      <div slot="BTextfield">
        <h2 class="text-2xl mb-4">BTextfield</h2>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <BTextfield v-model="value" placeholder="type: text" type="text" />
            <p>type: text, size: large (default)</p>
          </div>
          <div>
            <BTextfield
              v-model="value"
              placeholder="type: text"
              size="medium"
            />
            <p>type: text, size: medium</p>
          </div>
          <div>
            <BTextfield
              v-model="value"
              placeholder="type: text"
              type="text"
              size="small"
              disabled
            />
            <p>size: small, disabled</p>
          </div>
          <div>
            <BTextfield
              v-model="value"
              placeholder="type: password"
              type="password"
            />
            <p>type: password</p>
          </div>
          <div>
            <BTextfield
              v-model="number"
              placeholder="type: number"
              type="number"
            />
            <p>type: number; value: {{ number }}</p>
          </div>
          <div>
            <BTextfield
              v-model="number2"
              placeholder="number with allowNegative"
              type="number"
              :allow-negative="true"
            />
            <p>number with allowNegative {{ number2 }}</p>
          </div>
          <div>
            <BTextfield
              v-model="value"
              placeholder="type: text"
              type="text"
              prefix="Rp"
            />
            <p>with prefix</p>
          </div>
          <div>
            <BTextfield
              v-model="value"
              placeholder="type: text"
              type="text"
              suffix="gram"
            />
            <p>with suffix</p>
          </div>
          <div>
            <BTextfield v-model="value" placeholder="type: text" type="text">
              <IconEye slot="prefix" class="mr-1" />
              <IconEye slot="suffix" class="ml-1" />
            </BTextfield>
            <p>custom suffix & prefix</p>
          </div>
        </div>
      </div>

      <div slot="BButton">
        <h2 class="text-2xl mb-4">BButton</h2>
        <div class="grid grid-cols-4 gap-4">
          <div>
            <BButton class="w-full">BButton</BButton>
            <p>size: Large (default)</p>
          </div>
          <div>
            <BButton class="w-full" size="medium">BButton</BButton>
            <p>size: medium</p>
          </div>
          <div>
            <BButton class="w-full" size="small">BButton</BButton>
            <p>size: small</p>
          </div>
          <div>
            <BButton class="w-full" size="smaller">BButton</BButton>
            <p>size: smaller</p>
          </div>
          <div>
            <BButton>BButton</BButton>
            <p>variant: primary (default)</p>
          </div>
          <div>
            <BButton variant="primary-naked">BButton</BButton>
            <p>variant: primary-naked</p>
          </div>
          <div>
            <BButton variant="naked">BButton</BButton>
            <p>variant: naked</p>
          </div>

          <div>
            <BButton variant="ghost">BButton</BButton>
            <p>variant: ghost</p>
          </div>
          <div>
            <BButton variant="naked">
              <IconEye class="mr-2" />
              With Icon
            </BButton>
            <p></p>
          </div>
          <div>
            <BButton :loading="true">BButton</BButton>
            <p>loading: true</p>
          </div>
          <div>
            <BButton disabled>BButton</BButton>
            <p>disabled</p>
          </div>
          <div>
            <BButton disabled variant="naked">BButton</BButton>
            <p>disabled (naked)</p>
          </div>
          <div>
            <BButton href="#BButton-link">BButton</BButton>
            <p>add href to automatically generate as a link</p>
          </div>
          <div>
            <BButton href="#BButton-link" variant="naked">BButton</BButton>
            <p>link naked</p>
          </div>
        </div>
      </div>

      <div slot="BTextarea">
        <h2 class="text-2xl mb-4">BTextarea</h2>
        <div class="grid grid-cols-2 gap-4">
          <BTextarea v-model="value" placeholder="BTextarea" @change="test" />
          <BTextarea
            v-model="value"
            placeholder="Disabled"
            disabled
            @change="test"
          />
        </div>
      </div>

      <div slot="BSelect">
        <h2 class="text-2xl mb-4">BSelect</h2>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <BSelect
              v-model="select"
              :options="['1', '2', '3', 'asdf']"
            ></BSelect>
            <p>size: large (default), value: {{ select }}</p>
          </div>
          <div>
            <BSelect
              v-model="select"
              :options="['1', '2', '3', 'asdf']"
              size="medium"
            ></BSelect>
            <p>size: medium, value: {{ select }}</p>
          </div>
          <div>
            <BSelect
              v-model="select"
              :options="['1', '2', '3', 'asdf']"
              size="small"
            ></BSelect>
            <p>size: small, value: {{ select }}</p>
          </div>
          <div>
            <BSelect
              v-model="select"
              :options="['1', '2', '3', 'asdf']"
              placeholder="placeholder"
            ></BSelect>
            <p>with placeholder</p>
          </div>
          <div>
            <BSelect
              v-model="select"
              :options="['1', '2', '3', 'asdf']"
              disabled
            ></BSelect>
            <p>disabled</p>
          </div>
          <div>
            <BSelect
              v-model="selectObject"
              :options="[
                { key: 1, value: 'one' },
                { key: 2, value: 'two' },
              ]"
              @change="test"
            ></BSelect>
            <p>array of object options; value: {{ selectObject }}</p>
          </div>
        </div>
      </div>

      <div slot="BCheckbox">
        <h2 class="text-2xl mb-4">BCheckbox</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <BCheckbox
              id="checkbox-1"
              v-model="checkboxValue"
              label="BCheckbox Example"
            />
            <p>value: {{ checkboxValue }}</p>
          </div>
          <div>
            <BCheckbox
              id="checkbox-2"
              v-model="checkboxValue2"
              true-value="benar"
              false-value="salah"
            >
              With Custom true/false value
            </BCheckbox>
            <p>value: {{ checkboxValue2 }}</p>
          </div>
          <div>
            <BCheckbox
              id="checkbox-3"
              v-model="checkboxValue"
              label="BCheckbox Disabled"
              disabled
            />
            <p>value: {{ checkboxValue }}</p>
          </div>
        </div>
      </div>

      <div slot="BSwitch">
        <h2 class="text-2xl mb-4">BSwitch</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <BSwitch
              id="checkbox-1"
              v-model="checkboxValue"
              label="BSwitch Example"
            />
            <p>value: {{ checkboxValue }}</p>
          </div>
          <div>
            <BSwitch
              id="checkbox-2"
              v-model="checkboxValue2"
              true-value="benar"
              false-value="salah"
            >
              With Custom true/false value
            </BSwitch>
            <p>value: {{ checkboxValue2 }}</p>
          </div>
          <div>
            <BSwitch
              id="checkbox-3"
              v-model="checkboxValue"
              label="BSwitch Disabled"
              disabled
            />
            <p>value: {{ checkboxValue }}</p>
          </div>
        </div>
      </div>

      <div slot="BField">
        <h2 class="text-2xl mb-4">BField</h2>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <BField label="Bfield" target-id="bfield-1">
              <BTextfield
                id="bfield-1"
                v-model="value"
                placeholder="lorem ipsum"
                type="text"
              />
            </BField>
          </div>

          <div>
            <BField
              label="Bfield Required"
              :required="true"
              target-id="bfield-2"
            >
              <BTextfield
                id="bfield-2"
                v-model="value"
                placeholder="lorem ipsum"
                type="text"
              />
            </BField>
            <p>required: true</p>
          </div>

          <div>
            <BField
              label="Bfield Hint"
              hint="this is a hint"
              target-id="bfield-3"
            >
              <BTextarea
                v-model="value"
                placeholder="BTextarea"
                @change="test"
              />
            </BField>
            <p>with hint</p>
          </div>

          <div>
            <BField
              label="Bfield Error"
              error="this is an error message"
              target-id="bfield-4"
            >
              <BSelect
                v-model="select"
                :options="['1', '2', '3']"
                placeholder="Select"
              ></BSelect>
            </BField>
            <p>with error message</p>
          </div>
        </div>
      </div>

      <div slot="BTabs">
        <h2 class="text-2xl mb-4">BTabs</h2>
        <BTabs
          :tabs="['Lorem', 'Ipsum Dolor', 'Sit Amet']"
          :menu-class="['w-[10px]']"
          direction="vertical"
          active-tab="Ipsum Dolor"
        >
          <div slot="Lorem">Lorem Content</div>
          <div slot="Ipsum Dolor">Ipsum Dolor Content</div>
          <div slot="Sit Amet">Sit Amet Content</div>
        </BTabs>
        <BTabs
          :tabs="['Lorem', 'Ipsum Dolor', 'Sit Amet']"
          active-tab="Ipsum Dolor"
          class="mt-8"
        >
          <div slot="Lorem">Lorem Content</div>
          <div slot="Ipsum Dolor">Ipsum Dolor Content</div>
          <div slot="Sit Amet">Sit Amet Content</div>
        </BTabs>
      </div>

      <div slot="BDialog">
        <h2 class="text-2xl mb-4">BDialog</h2>
        <div class="">
          <BDialog
            :active.sync="isDialogActive"
            :close-button="true"
            title="BDialog Title"
            dialog-class="w-[480px]"
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem necessitatibus consequatur et nihil asperiores,
              fuga laudantium odio vitae. Sunt ad itaque at fugiat unde
              voluptatibus qui nesciunt ipsum accusantium delectus?
            </div>
            <template slot="footer">
              <BButton
                variant="ghost"
                class="w-full"
                @click="isDialogActive = false"
                >Cancel</BButton
              >
              <BButton class="w-full">Confirm</BButton>
            </template>
          </BDialog>
          <BButton @click="isDialogActive = true">Open Dialog</BButton>
        </div>
      </div>

      <div slot="BPagination">
        <h2 class="text-2xl mb-4">BPagination</h2>
        <div class="">
          <BPagination
            :total="1000"
            :page="page"
            @change="(val) => (page = val)"
          />
        </div>
      </div>

      <div slot="BTable">
        <h2 class="text-2xl mb-4">BTable</h2>
        <div class="">
          <BTable
            :columns="table.columns"
            :items="table.items"
            :sort="table.sort"
            :selectable="true"
            @sort="sort"
            @select="onSelectTableItem"
          >
            <div slot="table-select-header" class="flex items-center py-2">
              <span class="font-normal">
                {{ table.selected.length }} Produk Terpilih
              </span>
              <BButton
                size="small"
                class="w-auto px-4 py-1 ml-4"
                variant="naked"
                >Delete</BButton
              >
            </div>
            <template slot="action">
              <BButton
                class="w-auto px-4 py-1 ml-4"
                size="small"
                variant="naked"
                >Delete</BButton
              >
            </template>
          </BTable>
        </div>
      </div>

      <div slot="BRadio">
        <h2 class="text-2xl mb-4">BRadio</h2>
        <div class="">
          <BRadio id="radio-1" v-model="radio" :value="1" label="One"
            >One</BRadio
          >
          <BRadio id="radio-2" v-model="radio" :value="2" class="mt-2">
            <span class="block">Two</span>
            <span class="text-xs text-ui-shade-60 font-normal">with notes</span>
          </BRadio>
        </div>
        <p>value: {{ radio }}</p>
      </div>

      <div slot="BImageUpload">
        <h2 class="text-2xl mb-4">BImageUpload</h2>
        <div class="">
          <BImageUpload v-model="imageUpload" />
          <p class="break-all">
            value: {{ JSON.stringify(imageUpload).slice(0, 256) }}...
          </p>
        </div>
      </div>

      <div slot="BFileUpload">
        <h2 class="text-2xl mb-4">BFileUpload</h2>
        <div class="">
          <BFileUpload v-model="fileUpload" class="mb-2" />
          <p class="break-all">
            value: {{ JSON.stringify(fileUpload).slice(0, 256) }}...
          </p>
        </div>
      </div>

      <div slot="BCapsule">
        <h2 class="text-2xl mb-4">BCapsule</h2>
        <div class="">
          <BCapsule v-model="capsule" :options="['lorem', 'ipsum', 'dolor']" />
        </div>
      </div>

      <div slot="BPopover">
        <h2 class="text-2xl mb-4">BPopover</h2>
        <div class="grid grid-cols-3 gap-4">
          <BPopover label="On Click">
            <div class="w-[280px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              dolorem adipisci neque in, quae ullam est voluptates pariatur
              nesciunt saepe nemo dolorum enim molestiae, accusantium obcaecati
              temporibus distinctio vero veniam.
            </div>
          </BPopover>

          <BPopover label="On Hover" trigger="hover">
            <div class="w-[280px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              dolorem adipisci neque in, quae ullam est voluptates pariatur
              nesciunt saepe nemo dolorum enim molestiae, accusantium obcaecati
              temporibus distinctio vero veniam.
            </div>
          </BPopover>

          <BPopover position="right" trigger="hover">
            <div
              slot="label"
              class="flex justify-center items-center gap-1 h-12 px-5 bg-ui-shade-0"
            >
              <IconEye /> Custom Label
            </div>
            <div class="w-[280px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              dolorem adipisci neque in, quae ullam est voluptates pariatur
              nesciunt saepe nemo dolorum enim molestiae, accusantium obcaecati
              temporibus distinctio vero veniam.
            </div>
          </BPopover>

          <BPopover label="Position Left (default)" position="left">
            <div class="w-[280px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              dolorem adipisci neque in, quae ullam est voluptates pariatur
              nesciunt saepe nemo dolorum enim molestiae, accusantium obcaecati
              temporibus distinctio vero veniam.
            </div>
          </BPopover>

          <BPopover label="Position Center" position="center">
            <div class="w-[280px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              dolorem adipisci neque in, quae ullam est voluptates pariatur
              nesciunt saepe nemo dolorum enim molestiae, accusantium obcaecati
              temporibus distinctio vero veniam.
            </div>
          </BPopover>

          <BPopover label="Position Right" position="right">
            <div class="w-[280px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              dolorem adipisci neque in, quae ullam est voluptates pariatur
              nesciunt saepe nemo dolorum enim molestiae, accusantium obcaecati
              temporibus distinctio vero veniam.
            </div>
          </BPopover>
        </div>
      </div>

      <div slot="BInputRange">
        <h2 class="text-2xl mb-4">BInputRange</h2>
        <div class="">
          <BInputRange v-model="inputRange" />
        </div>
      </div>

      <div slot="BTag">
        <h2 class="text-2xl mb-4">BTag</h2>
        <div class="">
          <BTag label="primary">default</BTag>
          <BTag label="primary" variant="primary">primary</BTag>
          <BTag label="primary" variant="naked">primary</BTag>
        </div>
      </div>

      <div slot="BDatepicker">
        <h2 class="text-2xl mb-4">BDatepicker</h2>
        <div class="flex gap-4">
          <div>
            <BDatepicker v-model="date.single" />
          </div>
          <div>
            <BDatepicker
              v-model="date.range"
              placeholder="Range Date"
              :range="true"
            />
          </div>
        </div>
      </div>

      <div slot="BPromised">
        <h2 class="text-2xl mb-4">BPromised</h2>
        <div class="flex flex-col gap-4">
          <div>
            <p>Promise pending:</p>
            <BPromised
              :promise="promise.pending"
              @retry="retryPromise"
            ></BPromised>
          </div>
          <div>
            <p>Promise resolved:</p>
            <BPromised :promise="promise.resolved" @retry="retryPromise">
              <div class="text-center py-12 mb-12">
                this content loaded after promise resolved
              </div>
            </BPromised>
          </div>
          <div>
            <p>Promise rejected:</p>
            <BPromised
              :promise="promise.rejected"
              @retry="retryPromise"
            ></BPromised>
          </div>
        </div>
      </div>

      <div slot="Template">
        <h2 class="text-2xl mb-4">Template</h2>
        <div class="">
          <div></div>
        </div>
      </div>
    </BTabs>
  </div>
</template>

<script>
import BButton from '../components/base/BButton.vue'
import BTextfield from '../components/base/BTextfield.vue'
import BTextarea from '../components/base/BTextarea.vue'
import BSelect from '../components/base/BSelect.vue'
import BCheckbox from '../components/base/BCheckbox.vue'
import BSwitch from '../components/base/BSwitch.vue'
import BRadio from '../components/base/BRadio.vue'
import BField from '../components/base/BField.vue'
import BTabs from '../components/base/BTabs.vue'
import BDialog from '../components/base/BDialog.vue'
import BPagination from '../components/base/BPagination.vue'
import BTable from '../components/base/BTable.vue'
import BImageUpload from '../components/base/BImageUpload.vue'
import BFileUpload from '../components/base/BFileUpload.vue'
import BCapsule from '../components/base/BCapsule.vue'
import BPopover from '../components/base/BPopover.vue'
import BInputRange from '../components/base/BInputRange.vue'
import BTag from '../components/base/BTag.vue'
import BDatepicker from '../components/base/BDatepicker.vue'
import BPromised from '../components/base/BPromised.vue'

import IconEye from '../components/icons/IconEye.vue'

const components = {
  BTextfield,
  BTextarea,
  BButton,
  BSelect,
  BCheckbox,
  BSwitch,
  BRadio,
  BField,
  BDialog,
  BPagination,
  BTable,
  BTabs,
  BImageUpload,
  BFileUpload,
  BCapsule,
  BPopover,
  BInputRange,
  BTag,
  BDatepicker,
  BPromised,
}

export default {
  name: 'ComponentsPage',
  components: {
    ...components,
    IconEye,
  },
  layout: 'default',
  data: () => ({
    componentsList: Object.keys(components),
    value: null,
    number: 100000,
    number2: -100000,
    select: null,
    selectObject: 1,
    isDialogActive: false,
    checkboxValue: false,
    checkboxValue2: 'salah',
    radio: 1,
    page: 1,
    fileUpload: null,
    imageUpload: null,
    capsule: null,
    inputRange: null,
    promise: {
      pending: null,
      resolved: null,
      rejected: null,
    },
    date: {
      single: new Date(),
      range: null,
    },
    table: {
      columns: [
        {
          key: 'sku_id',
          label: 'No SKU',
          sortable: true,
        },
        {
          key: 'name',
          label: 'Nama Produk',
          sortable: true,
        },
        {
          key: 'category',
          label: 'Kategori',
          sortable: true,
        },
        {
          key: 'price',
          label: 'Harga',
        },
        {
          key: 'stock',
          label: 'Stok',
          sortable: true,
        },
        {
          key: 'status',
          modifier: ({ value }) => (value ? 'Active' : 'Inactive'),
        },
        {
          key: 'action',
          label: 'Tindakan',
        },
      ],
      items: [
        {
          sku_id: '12399347700001',
          name: 'Kiat-kiat Menjadi Sultan',
          category: 'Buku Sekolah',
          price: 150000,
          stock: 230,
          status: true,
        },
        {
          sku_id: '12399347700001',
          name: 'Kiat-kiat Menjadi Sultan Jilid 2',
          category: 'Buku Sekolah',
          price: 150000,
          stock: 230,
          status: true,
        },
        {
          sku_id: '12399347700001',
          name: 'Kiat-kiat Menjadi Sultan Jilid 3',
          category: 'Buku Sekolah',
          price: 150000,
          stock: 230,
          status: true,
        },
      ],
      sort: {
        by: null,
        asc: true,
      },
      selected: [],
    },
  }),
  created() {
    this.retryPromise()
  },
  methods: {
    test(val) {
      alert(val)
    },
    sort(val) {
      this.table.sort = { ...val }
    },
    onSelectTableItem(selectedIndexes) {
      this.table.selected = selectedIndexes
    },
    retryPromise() {
      this.promise.pending = new Promise((resolve) => {})
      this.promise.resolved = new Promise((resolve) =>
        setTimeout(() => resolve(), 1000)
      )
      // this.promise.resolved = this.$axios.$get('/users')
      // this.promise.rejected = new Promise((resolve) => {})
      this.promise.rejected = new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('test')), 1000)
      )
    },
  },
}
</script>
