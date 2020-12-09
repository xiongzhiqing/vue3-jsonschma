import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import { defineComponent } from 'vue'
import { withFormItem } from './FormItem'

const NumberWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'NumberWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        props.onChange(value)
      }
      return () => (
        <input
          value={props.value as any}
          type="number"
          onInput={handleChange}
        ></input>
      )
    },
  }),
)

export default NumberWidget
