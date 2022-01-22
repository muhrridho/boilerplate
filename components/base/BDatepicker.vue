<template>
  <DatePicker v-model="val" v-bind="inputAttr" class="w-full">
    <template slot="icon-calendar">
      <IconCalendar />
    </template>
  </DatePicker>
</template>

<script>
import 'vue2-datepicker/index.css'
import DatePicker from 'vue2-datepicker'
import IconCalendar from '../icons/IconCalendar.vue'

export default {
  name: 'BDatepicker',
  components: {
    DatePicker,
    IconCalendar,
  },
  inheritAttrs: false,
  model: {
    props: 'value',
    event: 'change',
  },
  props: ['value'],
  computed: {
    val: {
      set(val) {
        this.$emit('change', val)
      },
      get() {
        return this.value || null
      },
    },
    inputAttr() {
      return Object.assign({}, this.$attrs, {
        'input-class': [
          'border border-black-10 py-[11px] pl-3 pr-10 rounded focus:border-sip-peachy-pink outline-none placeholder-black-20 w-full',
          this.$attrs.inputClass,
          this.$attrs['input-class'],
        ].join(' '),
        'popup-class': [
          '!text-black-80 rounded-xl',
          this.$attrs.popupClass,
          this.$attrs['popup-class'],
        ].join(' '),
        lang: {
          formatLocale: {
            months: [
              'Januari',
              'Februari',
              'Maret',
              'April',
              'Mei',
              'Juni',
              'Juli',
              'Agustus',
              'September',
              'Oktober',
              'November',
              'Desember',
            ],
            monthsShort: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'Mei',
              'Jun',
              'Jul',
              'Agu',
              'Sep',
              'Okt',
              'Nov',
              'Des',
            ],
            weekdays: [
              'Minggu',
              'Senin',
              'Selasa',
              'Rabu',
              'Kamis',
              'Jumat',
              'Sabtu',
            ],
            weekdaysShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
            weekdaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          },
        },
        'range-separator': ' - ',
        'title-format': 'DD MMM YYYY',
        'time-title-format': 'DD MMM YYYY',
        format: 'DD MMM YYYY',
        placeholder: 'Pilih Tanggal',
      })
    },
  },
}
</script>
<style lang="scss">
.mx-datepicker-range {
  width: 100%;
}
.mx-icon-calendar,
.mx-icon-clear {
  right: 16px;
}
.mx-btn-text {
  color: rgba(0, 0, 0, 0.8);
}
.mx-calendar-content .cell.in-range,
.mx-calendar-content .cell.hover-in-range {
  @apply bg-ui-primary-lightest;
}
.mx-calendar-content .cell.not-current-month div {
  @apply hidden;
}
.mx-calendar-content .cell.active {
  @apply bg-ui-primary;
  font-weight: bold;
}
.mx-table-date th {
  @apply text-ui-shade-100;
}
.mx-table-date td,
.mx-table-date th {
  font-size: 14px;
}
.mx-table-date .today {
  @apply text-ui-primary;
  @apply font-bold;
}
.mx-table th {
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.mx-table th:first-child {
  @apply text-ui-red;
}
</style>
