import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { createUseStyles } from 'vue-jss'

const useStatyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    color: '#777',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    margin: '5px 0',
    padding: 0,
    paddingLeft: 20,
  },
})

const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const calssesRef = useStatyles()
    return () => {
      const { schema, errors } = props
      const classes = calssesRef.value
      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema.title}</label>
          {slots.default && slots.default()}
          <ul class={classes.errorText}>
            {errors?.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        </div>
      )
    }
  },
})

export default FormItem

/**
 * 高阶组件抽离FormItem逻辑
 * HOC: Higher Order Component：高阶组件 函数包装组件
 * @export
 * @param {*} Widget 组件
 */
export function withFormItem(Widget: any) {
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs} slots={slots}></Widget>
          </FormItem>
        )
      }
    },
  }) as any
}
