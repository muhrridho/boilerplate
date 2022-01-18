<template>
  <div class="container py-8">
    <h1 class="text-4xl">Components Page</h1>
    <BTabs
      :tabs="componentsList"
      class="mt-8"
      :activeTab="componentsList[componentsList.length - 1]"
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
              :allowNegative="true"
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
              <IconEye slot="suffix" />
              <IconEye slot="prefix" />
            </BTextfield>
            <p>custom suffix & prefix</p>
          </div>
        </div>
      </div>

      <div slot="BButton">
        <h2 class="text-2xl mb-4">BButton</h2>
        <div class="grid grid-cols-4 gap-4">
          <div>
            <BButton>BButton</BButton>
            <p>size: Large (default)</p>
          </div>
          <div>
            <BButton size="medium" variant="naked">BButton</BButton>
            <p>size: medium</p>
          </div>
          <div>
            <BButton size="small">BButton</BButton>
            <p>size: small</p>
          </div>
          <div>
            <BButton variant="naked">
              <IconEye class="mr-2" />
              With Icon
            </BButton>
            <p></p>
          </div>
          <div>
            <BButton>BButton</BButton>
            <p>variant: primary (default)</p>
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
            <BButton :loading="true">BButton</BButton>
            <p>loading: true</p>
          </div>
          <div>
            <BButton disabled>BButton</BButton>
            <p>disabled</p>
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
              v-model="checkboxValue"
              label="BCheckbox Example"
              id="checkbox-1"
            />
            <p>value: {{ checkboxValue }}</p>
          </div>
          <div>
            <BCheckbox
              v-model="checkboxValue2"
              id="checkbox-2"
              trueValue="benar"
              falseValue="salah"
            >
              With Custom true/false value
            </BCheckbox>
            <p>value: {{ checkboxValue2 }}</p>
          </div>
          <div>
            <BCheckbox
              v-model="checkboxValue"
              label="BCheckbox Disabled"
              id="checkbox-3"
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
              v-model="checkboxValue"
              label="BSwitch Example"
              id="checkbox-1"
            />
            <p>value: {{ checkboxValue }}</p>
          </div>
          <div>
            <BSwitch
              v-model="checkboxValue2"
              id="checkbox-2"
              trueValue="benar"
              falseValue="salah"
            >
              With Custom true/false value
            </BSwitch>
            <p>value: {{ checkboxValue2 }}</p>
          </div>
          <div>
            <BSwitch
              v-model="checkboxValue"
              label="BSwitch Disabled"
              id="checkbox-3"
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
            <BField label="Bfield" targetId="bfield-1">
              <BTextfield
                v-model="value"
                id="bfield-1"
                placeholder="lorem ipsum"
                type="text"
              />
            </BField>
          </div>

          <div>
            <BField
              label="Bfield Required"
              :required="true"
              targetId="bfield-2"
            >
              <BTextfield
                v-model="value"
                id="bfield-2"
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
              targetId="bfield-3"
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
              targetId="bfield-4"
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
          activeTab="Ipsum Dolor"
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
            :closeButton="true"
            title="BDialog Title"
            dialogClass="w-[480px]"
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem necessitatibus consequatur et nihil asperiores,
              fuga laudantium odio vitae. Sunt ad itaque at fugiat unde
              voluptatibus qui nesciunt ipsum accusantium delectus?
            </div>
            <template slot="footer">
              <BButton variant="ghost" @click="isDialogActive = false"
                >Cancel</BButton
              >
              <BButton>Confirm</BButton>
            </template>
          </BDialog>
          <BButton @click="isDialogActive = true">Open Dialog</BButton>
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
import BField from '../components/base/BField.vue'
import BTabs from '../components/base/BTabs.vue'
import BDialog from '../components/base/BDialog.vue'

import IconEye from '../components/icons/IconEye.vue'

const components = {
  BTextarea,
  BButton,
  BSelect,
  BCheckbox,
  BSwitch,
  BField,
  BTabs,
  BDialog,
  BTextfield,
}

export default {
  layout: 'default',
  name: 'ComponentsPage',
  components: {
    ...components,
    IconEye,
  },
  data: () => ({
    value: null,
    number: 100000,
    number2: -100000,
    select: null,
    selectObject: 1,
    isDialogActive: false,
    checkboxValue: false,
    checkboxValue2: 'salah',
    componentsList: Object.keys(components),
  }),
  methods: {
    test(val) {
      console.log(val)
    },
  },
}
</script>
