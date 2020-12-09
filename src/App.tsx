import { defineComponent, reactive, Ref, ref, watchEffect } from 'vue'
import ManacoEditor from './components/MonacoEditor'

import { createUseStyles } from 'vue-jss'

import demos from './demos'
import SchemaForm, { ThemeProvider } from '../lib'
import ThemeDefault from '../lib/theme-default'
import customFormat from './plugins/customFormat'
import customKeyword from './plugins/customKeyword'

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
  },
  code: {
    width: 700,
    flexShrink: 0,
  },
  codePanel: {
    minHeight: 300,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7',
    },
  },
})

type Schema = any
type UISchema = any

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

export default defineComponent({
  setup() {
    const selectedRef: Ref<number> = ref(0)

    const classesRef = useStyles()

    const demo: {
      schema: Schema | null
      data: any
      uiSchema: UISchema | null
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
      customValidate: ((d: any, e: any) => void) | undefined
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined,
    })

    watchEffect(() => {
      const index = selectedRef.value
      const d: any = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
      demo.customValidate = d.customValidate
    })

    // const methodRef: Ref<any> = ref()

    const handleChange = (v: any) => {
      demo.data = v
      demo.dataCode = toJson(v)
    }

    function handleCodeChange(
      filed: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) {
      try {
        const json = JSON.parse(value)
        demo[filed] = json
        ;(demo as any)[`${filed}Code`] = value
      } catch (e) {
        // some thing
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)
    // const schemaRef: Ref = ref(schema)

    // const handleCodeChange = (code: string) => {
    //   let schema: any
    //   try {
    //     schema = JSON.parse(code)
    //   } catch (e) {} // eslint-disable-line

    //   schemaRef.value = schema
    // }

    const contentRef = ref()
    const nameRef = ref()

    function validateForm() {
      contentRef.value.doValidate().then((res: any) => {
        console.log(res)
      })
      // () => {
      //           // console.log('validate', contentRef.value.doValidate())
      //         }
    }

    return () => {
      const selected = selectedRef.value
      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <ManacoEditor
                class={classes.codePanel}
                code={demo.schemaCode}
                title="Schema"
                onChange={handleSchemaChange}
              />
              <div class={classes.uiAndValue}>
                <ManacoEditor
                  class={classes.codePanel}
                  code={demo.uiSchemaCode}
                  title="UISchema"
                  onChange={handleUISchemaChange}
                />
                <ManacoEditor
                  class={classes.codePanel}
                  code={demo.dataCode}
                  title="Value"
                  onChange={handleDataChange}
                />
              </div>
            </div>
            <div class={classes.form}>
              <ThemeProvider theme={ThemeDefault}>
                <SchemaForm
                  customFormats={customFormat}
                  customKeywords={customKeyword}
                  uiSchema={demo.uiSchema || {}}
                  schema={demo.schema}
                  onChange={handleChange}
                  value={demo.data}
                  contentRef={contentRef}
                  ref={nameRef}
                  customValidate={demo.customValidate}
                />
              </ThemeProvider>
              <button onClick={validateForm}>validate</button>
            </div>
          </div>
        </div>
      )
    }
  },
})
