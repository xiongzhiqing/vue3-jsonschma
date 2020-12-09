import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import { computed, defineComponent } from 'vue'
import { withFormItem } from './FormItem'

const TextWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        // 输入瞬间把输入值重置回初始值，等待onChange更新绑定props.value 后同步更新dom value
        e.target.value = props.value
        console.log(value)
        props.onChange(value)
      }

      const styleRef = computed(() => {
        return {
          color: (props.options && props.options.color) || 'black',
        }
      })

      return () => (
        <input
          style={styleRef.value}
          value={props.value as any}
          type="text"
          onInput={handleChange}
        ></input>
      )
    },
  }),
)

export default TextWidget
