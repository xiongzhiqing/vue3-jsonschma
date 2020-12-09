import {
  defineComponent,
  PropType,
  provide,
  Ref,
  shallowRef,
  watch,
  watchEffect,
  ref,
  computed,
} from 'vue'
import {
  CommonWidgetDefine,
  CustomFormat,
  CustomKeyword,
  Schema,
  UISchema,
} from './types'
import Ajv, { Options } from 'ajv'

import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import { validateFormData, ErrorSchema } from './validator'
import keyword from '@/plugins/customKeyword'

interface ContentRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true,
  // jsonPointers: true,
}

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contentRef: {
      type: Object as PropType<Ref<ContentRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: 'zh',
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
    customFormats: {
      type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>,
    },
    customKeywords: {
      type: [Array, Object] as PropType<CustomKeyword[] | CustomKeyword>,
    },
    uiSchema: {
      // 自定义表单渲染
      type: Object as PropType<UISchema>,
    },
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true
    // }
  },
  setup(props /* {  slots, emit, attrs }*/) {
    const handleChange = (v: any) => {
      // 如后续有需求，可以直接在此处添加
      props.onChange(v)
    }

    const errorsSchemaRef: Ref<ErrorSchema> = shallowRef({})

    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        customFormats.forEach((format) => {
          validatorRef.value.addFormat(format.name, format.definition)
        })
      }

      if (props.customKeywords) {
        const customKeywords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords]
        customKeywords.forEach((keyword) => {
          validatorRef.value.addKeyword(keyword.name, keyword.definition)
        })
      }
    })

    const validateResolveRef = ref()

    // 每次validate的值
    const validateIndex = ref(0)

    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          doValidate()
        }
      },
      {
        deep: true,
      },
    )

    async function doValidate() {
      const index = (validateIndex.value += 1)
      console.log(index, validateIndex.value)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate,
      )
      // 上下文index如果不一致就不需要再执行
      console.log(index !== validateIndex.value)
      if (index !== validateIndex.value) return
      console.log('end')
      errorsSchemaRef.value = result.errorSchema
      validateResolveRef.value(result)
      validateResolveRef.value = undefined
      // return result
    }
    watch(
      () => props.contentRef,
      () => {
        if (props.contentRef) {
          props.contentRef.value = {
            doValidate() {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
              // console.log('doValidate ----- ')
              // // const valid = validatorRef.value.validate(props.schema, props.value) as boolean
              // const result = await validateFormData(validatorRef.value, props.value, props.schema, props.locale, props.customValidate)

              // errorsSchemaRef.value = result.errorSchema
              // return result
            },
          }
        }
      },
      {
        immediate: true,
      },
    )

    const formatMapRef = computed(() => {
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        return customFormats.reduce((result, format) => {
          result[format.name] = format.component
          // validatorRef.value.addFormat(format.name, format.definition)
          return result
        }, {} as { [key: string]: CommonWidgetDefine })
      } else {
        return {}
      }
    })

    const transformSchemaRef = computed(() => {
      if (props.customKeywords) {
        const customKeywords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords]
        return (schema: Schema) => {
          let newSchema = schema
          customKeywords.forEach((keyword) => {
            if ((newSchema as any)[keyword.name]) {
              newSchema = keyword.transformSchema(schema)
            }
          })
          return newSchema
        }
        //  customKeywords.forEach(keyword => {
        //    validatorRef.value.addKeyword(keyword.name, keyword.definition)
        //  })
      }
      return (schema: Schema) => schema
    })
    const context: any = {
      SchemaItem,
      formatMapRef,
      transformSchemaRef,
      // theme: props.theme
    }

    // 向当前节点后的所有子节点以及叶子结点提供SchemItem组件
    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value, uiSchema } = props
      return (
        <SchemaItem
          uiSchema={uiSchema || {}}
          schema={schema}
          value={value}
          rootSchema={schema}
          onChange={handleChange}
          errorSchema={errorsSchemaRef.value || {}}
        />
      )
    }
  },
})
