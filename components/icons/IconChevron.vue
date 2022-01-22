<template>
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 11 14"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :style="directionStyle"
  >
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      fill-opacity="1"
    >
      <path
        id="Chevron-Right"
        d="M5.2,8.44456215 L9.73333333,2.4001177 C10.1751611,1.81101397 11.0108963,1.69162324 11.6,2.13345104 C12.1891037,2.57527884 12.3084945,3.41101397 11.8666667,4.0001177 L6.26666667,11.4667844 C5.73333333,12.1778955 4.66666667,12.1778955 4.13333333,11.4667844 L-1.46666667,4.0001177 C-1.90849447,3.41101397 -1.78910373,2.57527884 -1.2,2.13345104 C-0.610896267,1.69162324 0.224838867,1.81101397 0.666666667,2.4001177 L5.2,8.44456215 Z"
        fill="currentColor"
        fill-rule="nonzero"
        transform="translate(5.200000, 6.933412) rotate(-90.000000) translate(-5.200000, -6.933412) "
      ></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconChevron',
  props: {
    direction: {
      type: String,
      default: 'right',
    },
  },
  computed: {
    directionStyle() {
      let style
      if (this.direction === 'left') style = 'transform: rotate(180deg)'
      if (this.direction === 'up') style = 'transform: rotate(-90deg)'
      if (this.direction === 'right') style = 'transform: rotate(0)'
      if (this.direction === 'down') style = 'transform: rotate(90deg)'

      return style
    },
  },
}
</script>
