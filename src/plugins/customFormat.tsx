import { defineComponent, computed } from 'vue'
import { CommonWidgetPropsDefine, CustomFormat } from '../../lib/types'
import { withFormItem } from '../../lib/theme-default/FormItem'

const format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9A-Fa-f]{6}$/,
    // compare:
  },
  component: withFormItem(
    defineComponent({
      name: 'ColorWidget',
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
            type="color"
            onInput={handleChange}
          />
        )
      },
    }),
  ),
}

export default format
