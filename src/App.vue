<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ name }} - {{ name2 }}</h1>
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" :age="12" />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

interface Config {
  name: string
}
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(this.name, 'mounted')
  },
  setup(props, { slots, attrs, emit }) {
    console.log(props, slots, attrs, emit)
    const state = reactive({
      name: 'Qing',
    })
    const nameRef = ref('Qing')
    setTimeout(() => {
      nameRef.value = 'ZhiQing'
    }, 1000)

    const computedName = computed(() => {
      return nameRef.value + 2
    })

    watchEffect(() => {
      console.log(nameRef.value, 'watchEffect')
    })
    return {
      name: nameRef,
      name2: computedName,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
