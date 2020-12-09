import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../../lib/types'
import { defineComponent } from 'vue'
import { withFormItem } from '../../lib/theme-default/FormItem'

const PasswordWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'PasswordWidget',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const value = e.target.value
        // 输入瞬间把输入值重置回初始值，等待onChange更新绑定props.value 后同步更新dom value
        e.target.value = props.value
        console.log(value)
        props.onChange(value)
      }
      return () => (
        <input
          value={props.value as any}
          type="password"
          onInput={handleChange}
        ></input>
      )
    },
  }),
)

export default PasswordWidget
