import { mount } from '@vue/test-utils'
import { NumberField, StringField, ArrayField, Selection } from '../../lib'

import TestComponent from './utils/TestComponent'

describe('ArrayField.spec.ts', () => {
  it('should render multi type', () => {
    const warpper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [{ type: 'string' }, { type: 'number' }],
        },
        value: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: () => {},
      },
    })

    const arrField = warpper.findComponent(ArrayField)
    const strField = arrField.findComponent(StringField)
    const numField = arrField.findComponent(NumberField)

    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })

  it('should render mutil select type', () => {
    const warpper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string', enum: ['1', '2', '3'] },
        },
        value: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: () => {},
      },
    })

    const arrField = warpper.findComponent(ArrayField)
    const select = arrField.findComponent(Selection)

    expect(select.exists()).toBeTruthy()
  })

  it('should render single type', () => {
    const warpper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string' },
        },
        value: ['1', '2'],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: () => {},
      },
    })

    const arrField = warpper.findComponent(ArrayField)
    const strFields = arrField.findAllComponents(StringField)

    expect(strFields.length).toBe(2)
    expect(strFields[0].props('value')).toBe('1')
  })
})
