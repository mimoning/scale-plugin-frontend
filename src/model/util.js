export default function (obj, args) {
  const props = {}
  Object.entries(args)
    .forEach(arg => {
      const [key, value] = arg
      props[key] = {
        value,
        writable: false,
        enumerable: true
      }
    })
  Object.defineProperties(obj, props)
}
