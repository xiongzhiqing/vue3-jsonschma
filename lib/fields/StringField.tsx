import { computed, defineComponent } from 'vue'
import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: string) => {
      // jsx语法需要配置babel-plugin-jsx mergeProps：false，取消Vue模板编译自动合并属性项（自动合并后onChange会变成一个数组）
      props.onChange(v)
    }

    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props)
      return widgetRef.value
    })

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })
    return () => {
      const { rootSchema, errorSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value
      return (
        <TextWidget
          errors={errorSchema.__errors}
          {...rest}
          onChange={handleChange}
          options={widgetOptionsRef.value}
        />
      )
      // return <input value={value as any} type="text" onInput={handleChange}></input>
    }
  },
})
