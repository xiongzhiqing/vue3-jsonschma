<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{ age }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const PropType = {
  msg: String,
  age: {
    type: Number,
    required: true,
  },
} as const // 解决required：true时，this.age 类型推断为number | undefined 的情况
export default defineComponent({
  name: 'HelloWorld',
  props: PropType,
  mounted() {
    console.log(this.age)
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
