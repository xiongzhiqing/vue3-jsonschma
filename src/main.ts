import { createApp } from 'vue'
// import App from "./App.vue";
// import HelloWorld from './components/HelloWorld.vue'
import App from './App'
// const img1 = require('./assets/logo.png') // eslint-disable-line

// const App = defineComponent({
//   render() {
//     return h('div', {
//       id: 'app'
//     }, [
//       h('img', {
//         alt: 'Vue logo',
//         src: img1,
//       }),
//       h(HelloWorld, {
//         msg: 'Welcome to Your Vue.js + TypeScript App',
//         age: 12,
//       }),
//     ])
//   },
// })
// setup 返回render函数
// const App = defineComponent({
//   setup() {
//     const state = reactive({
//       name: 'Qing',
//     })
//     setTimeout(() => {
//       state.name += 1
//     }, 1000)
//     return () => {
//       // render写法
//       // return h('div',
//       //   {
//       //     id: 'app',
//       //   },
//       //   [
//       //     h('img', {
//       //       alt: 'Vue logo',
//       //       src: img1,
//       //     }),
//       //     h('p', state.name),
//       //   ],
//       // )
//       // JSX写法
//       return
//     }
//   },
// })
createApp(App).mount('#app')
