import { defineComponent, PropType, ref, watch, watchEffect } from 'vue'
import { SelectionnWidgetPropsDefine, SelectionnWidgetDefine } from '../types'

import { withFormItem } from './FormItem'

const Selection: SelectionnWidgetDefine = withFormItem(
  defineComponent({
    name: 'SelectionWidget',
    props: SelectionnWidgetPropsDefine,
    setup(props) {
      const currentValueRef = ref(props.value)

      watch(currentValueRef, (v) => {
        if (v !== props.value) {
          props.onChange(v)
        }
      })

      watch(
        () => props.value,
        (v) => {
          if (v !== currentValueRef.value) {
            currentValueRef.value = v
          }
        },
      )

      watchEffect(() => {
        console.log(currentValueRef.value, '--------')
      })

      return () => {
        const { options } = props
        return (
          <select multiple={true} v-model={currentValueRef.value}>
            {options.map(({ key, value }) => (
              <option value={value}>{key}</option>
            ))}
          </select>
        )
      }
    },
  }),
)

export default Selection
