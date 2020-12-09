import { defineComponent, PropType } from 'vue'
import JsonSchemaForm, { Schema, ThemeProvider } from '../../../lib'
import theme from '../../../lib/theme-default'

export const ThemeDefatultProvider = defineComponent({
  setup(p, { slots }) {
    return () => (
      <ThemeProvider theme={theme}>
        {slots.default && slots.default()}
      </ThemeProvider>
    )
  },
})

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true
    // }
  },
  setup(props) {
    return () => (
      <ThemeDefatultProvider>
        <JsonSchemaForm {...props} />
      </ThemeDefatultProvider>
    )
  },
})
