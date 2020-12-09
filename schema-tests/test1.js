/* eslint-disable @typescript-eslint/no-var-requires */
// Node.js require:
const Ajv = require('ajv')
const localize = require('ajv-i18n')
// or ESM/TypeScript import
// import Ajv from 'ajv';
// const schema = {
//   type: 'string',
//   minLength: 10
// }
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // format: 'email'
      format: 'test',
      testKey: 'hello1',
      errorMessage: {
        testKey: '必须是 hello1', //  不支持自定义keyword错误提示
        minLength: '长度不能小于10',
      },
      minLength: 10,
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}
const ajv = new Ajv({ allErrors: true, jsonPointers: true }) // options can be passed, e.g. {allErrors: true}
require('ajv-errors')(ajv)
// 自定义format
ajv.addFormat('test', (data) => {
  console.log(data, 'addFormat')
  return data === 'hello'
})

ajv.addKeyword('testKey', {
  validate: function(schema, data) {
    console.log(schema, data, 'addKeyword')
    return typeof schema == 'object' && schema !== null
      ? Object.assign(schema, data) // deepEqual(schema, data)
      : schema === data
  },
  errors: false,
})
const validate = ajv.compile(schema)
// const valid = validate('XiongZhiQing');
const valid = validate({
  name: 'hello',
  age: 18,
  pet: ['mimi', 'kaka'],
  isWorker: true,
})
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
