import { computed, defineComponent } from 'vue'
import NumberField from './fields/NumberField'
// import NumberField from './fields/NumberField.vue'
import StringField from './fields/StringField'
// import StringField from './fields/StringField.vue'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'
import { SchemaTypes, FiledPropsDefine } from './types'

import { retrieveSchema } from './utils'
import { useVJSFContent } from './context'

export default defineComponent({
  name: 'SchemaItems',
  props: FiledPropsDefine,
  setup(props) {
    const formContext = useVJSFContent()

    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props

      return formContext.transformSchemaRef.value(
        retrieveSchema(schema, rootSchema, value),
      )
    })
    return () => {
      const { schema } = props

      const retrievedSchema = retrievedSchemaRef.value

      // TODO: 如果type没有指定，我们可以猜测这个type
      const type = schema.type
      let Compnent: any

      switch (type) {
        case SchemaTypes.STRING: {
          Compnent = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Compnent = NumberField
          break
        }
        case SchemaTypes.OBJECT: {
          Compnent = ObjectField
          break
        }
        case SchemaTypes.ARRAY: {
          Compnent = ArrayField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }
      // ;<NumberField />
      return <Compnent {...props} schema={retrievedSchema} />
    }
  },
})
