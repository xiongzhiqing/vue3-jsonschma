<template>
  <input :value="value" type="number" @input="handleChange" />
</template>

<script lang="ts" setup="props">
// import { ref } from 'vue'
import { FiledPropsDefine, Schema } from '../types'

export default {
  props: FiledPropsDefine,
}
declare const props: {
  value: number
  onChange: (v: number | undefined) => void
  schema: Schema
}

export const handleChange = (e: any) => {
  const value = e.target.value
  const num = +value

  props.onChange(Number.isNaN(num) ? undefined : num)
}
</script>
