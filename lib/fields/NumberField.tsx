import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { defineComponent } from 'vue'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      const num = +v
      // jsx语法需要配置babel-plugin-jsx mergeProps：false，取消Vue模板编译自动合并属性项（自动合并后onChange会变成一个数组）
      props.onChange(Number.isNaN(num) ? undefined : num)
    }
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)
    return () => {
      const NumberWidget = NumberWidgetRef.value
      const { rootSchema, errorSchema, ...rest } = props
      return (
        <NumberWidget
          errors={errorSchema.__errors}
          {...rest}
          onChange={handleChange}
        />
      )
    }
  },
})
