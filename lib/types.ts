import { PropType, DefineComponent } from 'vue'
import { ErrorSchema } from './validator'
import { FormatDefinition, CompilationContext } from 'ajv'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }

export interface Schema {
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any

  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimun?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const FiledPropsDefine = {
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
  rootSchema: {
    type: Object as PropType<Schema>,
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true,
  },
  uiSchema: {
    type: Object as PropType<UISchema>,
    required: true,
  },
} as const

export type CommonFieldType = DefineComponent<typeof FiledPropsDefine>

export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  options: {
    // 任意的属性都可以通过options传入
    type: Object as PropType<{ [keys: string]: any }>,
  },
} as const

export const SelectionnWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<
      {
        key: string
        value: any
      }[]
    >,
    required: true,
  },
} as const

export type CommonWidgetDefine = DefineComponent<
  typeof CommonWidgetPropsDefine,
  {},
  {}
>

export type SelectionnWidgetDefine = DefineComponent<
  typeof SelectionnWidgetPropsDefine,
  {},
  {}
>

export enum SelectionWidgetNames {
  SelectionWidget = 'SelectionWidget',
}

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
}

export interface Theme {
  widgets: {
    [SelectionWidgetNames.SelectionWidget]: SelectionnWidgetDefine
    [CommonWidgetNames.TextWidget]: CommonWidgetDefine
    [CommonWidgetNames.NumberWidget]: CommonWidgetDefine
  }
}
// 接收第一个大括号里面定义好的属性以外（第二个大括号）的任意属性
export type UISchema = {
  widget?: string | CommonWidgetDefine
  properties?: {
    [key: string]: UISchema
  }
  items?: UISchema | UISchema[]
} & {
  [key: string]: any // w: 开头
}

export interface CustomFormat {
  name: string
  definition: FormatDefinition
  component: CommonWidgetDefine
}

interface VjsfKeywordDefinition {
  type?: string | Array<string>
  async?: boolean
  $data?: boolean
  errors?: boolean | string
  metaSchema?: object
  // schema: false makes validate not to expect schema (ValidateFunction)
  schema?: boolean
  statements?: boolean
  dependencies?: Array<string>
  modifying?: boolean
  valid?: boolean
  // one and only one of the following properties should be present
  macro: (
    schema: any,
    parentSchema: object,
    it: CompilationContext,
  ) => object | boolean
}
export interface CustomKeyword {
  name: string
  definition: VjsfKeywordDefinition
  transformSchema: (originSchema: Schema) => Schema
}
