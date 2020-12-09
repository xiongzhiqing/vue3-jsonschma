import { defineComponent, reactive, ref } from 'vue'
const img = require('./assets/logo.png') // eslint-disable-line
import HelloWorld from './components/HelloWorld'

function renderHelloWorld(num: number) {
  return <HelloWorld age={num} />
}
export default defineComponent({
  setup() {
    const state = reactive({
      name: 'Qing',
    })
    const nmuberRef = ref(1)
    setTimeout(() => {
      state.name += 1
      nmuberRef.value += 1
    }, 1000)
    return () => {
      const number = nmuberRef.value
      return (
        <div id="app">
          <img src={img} alt="Vue logo" />
          <p>
            <input v-model={state.name}></input>
          </p>
          <p>{state.name + number}</p>
          <p>组件引入</p>
          {renderHelloWorld(12)}
        </div>
      )
    }
  },
})
