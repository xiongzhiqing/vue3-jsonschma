import { defineComponent, PropType } from 'vue'
import { useVJSFContent } from '../context'
import { FiledPropsDefine, Schema, SelectionWidgetNames } from '../types'
import { createUseStyles } from 'vue-jss'
import { getWidget } from '../theme'
// import SelectWidget from '../widgets/Selection'
const useStyles = createUseStyles({
  container: {
    border: '1px solid. #eee',
  },
  actions: {
    background: '#eeee',
    padding: 10,
    textAlign: 'right',
  },
  action: {
    '& + &': {
      marginRight: '10',
    },
  },
  content: {
    padding: 10,
  },
})

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles()

    const handleAdd = () => props.onAdd(props.index)
    const handleDelete = () => props.onDelete(props.index)
    const handleUp = () => props.onUp(props.index)
    const handleDown = () => props.onDown(props.index)

    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})
/**
 * {
 *  items: {type: string}
 * }
 *
 * {
 *  items: [
 *    {type: string},
 *    {type: number}
 *  ]
 * }
 *
 * {
 *  items: {type:string, enum: ['1', '2]} // 多选形式
 * }
 */
export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup(props) {
    const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget)
    const context = useVJSFContent()

    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      arr[index] = v

      props.onChange(arr)
    }

    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      arr.splice(index + 1, 0, undefined)

      props.onChange(arr)
    }

    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      arr.splice(index, 1)

      props.onChange(arr)
    }
    const handleUp = (index: number) => {
      if (index === 0) return
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, ...item)

      props.onChange(arr)
    }
    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length - 1) return

      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, ...item)

      props.onChange(arr)
    }
    return () => {
      // const SelectWidget = context.theme.widgets.SelectionWidget
      const SelectWidget = SelectionWidgetRef.value
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      const { SchemaItem } = context

      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum

      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => {
          const itemsUISchema = uiSchema.items
          const us = Array.isArray(itemsUISchema)
            ? itemsUISchema[index] || {}
            : {}
          return (
            // <ArrayItemWrapper>
            <SchemaItem
              uiSchema={us}
              errorSchema={errorSchema[index] || {}}
              schema={s}
              key={index}
              rootSchema={rootSchema}
              value={arr[index]}
              onChange={(v: any) => handleArrayItemChange(v, index)}
            />
            // </ArrayItemWrapper>
          )
        })
      } else if (!isSelect) {
        // 单类型array（无enum）
        const arr = Array.isArray(value) ? value : []

        return arr.map((v: any, index: number) => (
          <ArrayItemWrapper
            index={index}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onDown={handleDown}
            onUp={handleUp}
          >
            <SchemaItem
              uiSchema={(uiSchema.items as any) || {}}
              errorSchema={errorSchema[index] || {}}
              schema={schema.items as Schema}
              value={v}
              key={index}
              rootSchema={rootSchema}
              onChange={(v: any) => handleArrayItemChange(v, index)}
            />
          </ArrayItemWrapper>
        ))
      } else {
        // 多选组件（包含enum）
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((e: any) => ({
          key: e,
          value: e,
        }))
        return (
          <SelectWidget
            errors={errorSchema.__errors}
            schema={schema}
            onChange={props.onChange}
            value={props.value}
            options={options}
          />
        )
      }
    }
  },
})
