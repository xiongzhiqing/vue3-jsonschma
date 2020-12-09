import { mount } from '@vue/test-utils'
import SchemaForm, { NumberField, StringField, ObjectField } from '../../lib'
describe('ObjectFiled.spec.ts', () => {
  let schema: any
  beforeEach(() => {
    schema = {
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
  })
  it('should render properties to correct fileds', async () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        value: {},
        onChange: (v: any) => {
          console.log(v)
        },
      },
    })
    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)

    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })

  it('should change value when sub fields trigger onChange', async () => {
    let value: any = {}
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v
        },
      },
    })
    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)

    await strField.props('onChange')('1')
    expect(value.name).toEqual('1')
    await numField.props('onChange')(1)
    expect(value.age).toEqual(1)
  })

  it('should render properties to correct fileds', async () => {
    let value: any = {
      name: 123,
    }
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        value,
        onChange: (v) => {
          value = v
        },
      },
    })
    const strField = wrapper.findComponent(StringField)
    await strField.props('onChange')(undefined)
    expect(value.name).toBeUndefined()
  })

  it('should props value default isObject', async () => {
    let value: any
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        value,
        onChange: (v) => {
          value = v
        },
      },
    })
    const strField = wrapper.findComponent(StringField)
    await strField.props('onChange')()
    expect(value).toMatchObject({})
  })

  it('should props schema properties is not define', async () => {
    let value: any
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'object',
        },
        value,
        onChange: (v) => {
          value = v
        },
      },
    })
    const objField = wrapper.findComponent(ObjectField)
    // await strField.props('schema')()
    expect(objField.exists()).toBeTruthy()
  })
})
