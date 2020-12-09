import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  PropType,
  provide,
  ref,
  ExtractPropTypes,
} from 'vue'
import {
  Theme,
  SelectionWidgetNames,
  CommonWidgetNames,
  FiledPropsDefine,
  CommonWidgetDefine,
} from './types'
import { isObject } from './utils'
import { useVJSFContent } from './context'
import SchemaForm from './SchemaForm'

const THEME_PROVIDER_KEY = Symbol()
const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    // 依赖更新
    const context = computed(() => props.theme)

    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default && slots.default()
  },
})

export function getWidget<T extends SelectionWidgetNames | CommonWidgetNames>(
  name: T,
  props?: ExtractPropTypes<typeof FiledPropsDefine>,
) {
  const formContent = useVJSFContent()
  if (props) {
    const { uiSchema, schema } = props
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget as CommonWidgetDefine)
    }

    if (schema.format) {
      if (formContent.formatMapRef.value[schema.format]) {
        return ref(formContent.formatMapRef.value[schema.format])
      }
    }
  }

  const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(
    THEME_PROVIDER_KEY,
  )

  if (!context) {
    throw new Error('vjsf theme required')
  }

  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })

  return widgetRef
}

export default ThemeProvider
