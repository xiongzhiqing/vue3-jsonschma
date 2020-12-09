import { useVJSFContent } from '../context'
import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'
import { isObject } from '../utils'

// import SchemaItem from '../SchemaItem'
// console.log(SchemaItem)
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
  },
}

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    // 获取祖先结点提供的内容
    // compositionApi usexxx
    const context = useVJSFContent()

    const handleObjectFieldChange = (k: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}

      if (v === undefined) {
        delete value[k]
      } else {
        value[k] = v
      }

      props.onChange(value)
    }
    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      // SchemaItem组件 父级结点provide分发过来的
      const { SchemaItem } = context

      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          uiSchema={uiSchema.properties ? uiSchema.properties[k] || {} : {}}
          errorSchema={errorSchema[k] || {}}
          schema={properties[k]}
          rootSchema={rootSchema}
          value={currentValue[k]}
          key={index}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
        />
      ))
    }
  },
})
