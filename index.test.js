const { add } = require(`./index`)

test(`adds two numbers together`, () => {
  expect(add(5, 5)).toEqual(10)
})
