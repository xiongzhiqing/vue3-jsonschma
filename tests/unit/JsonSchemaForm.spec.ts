import { mount } from '@vue/test-utils'
import { NumberField } from '../../lib'
import TestComponent from './utils/TestComponent'

describe('TestComponent', () => {
  it('should render correct number field', async () => {
    let value = 0
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'number',
        },
        value,
        onChange: (v) => {
          value = v
        },
      },
    })

    const numberFiled = wrapper.findComponent(NumberField)
    expect(numberFiled.exists()).toBeTruthy()

    // await numberFiled.props('onChange')('123')
    const input = numberFiled.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe(123)
  })
})
