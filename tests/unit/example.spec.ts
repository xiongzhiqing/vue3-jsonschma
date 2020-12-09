import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  // beforeEach(() => {
  //   console.log('beforeEach')
  // })

  // afterEach(() => {
  //   console.log('afterEach')
  // })

  // beforeAll(() => {
  //   console.log('beforeAll')
  // })

  // afterAll(() => {
  //   console.log('afterAll')
  // })
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const age = 18
    const wrapper = shallowMount(HelloWorld, {
      props: { msg, age },
    })
    expect(wrapper.text()).toMatch(msg)
  })

  it('should work', () => {
    expect(1 + 1).toBe(2)
  })
})

// describe('other', () => {
//   beforeEach(() => {
//     console.log('beforeEach other')
//   })

//   afterEach(() => {
//     console.log('afterEach other')
//   })

//   beforeAll(() => {
//     console.log('beforeAll other')
//   })

//   afterAll(() => {
//     console.log('afterAll other')
//   })
//   it('should work', () => {
//     expect(1 + 1).toBe(2)
//   })
// })
