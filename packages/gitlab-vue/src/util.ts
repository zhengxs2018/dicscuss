/** @internal */
export const singleton = <U = any, T = any>(factory: (options: U) => T) => {
  let instance: T

  const initial = (options: U) => {
    if (instance) return instance
    instance = factory(options)
    return instance
  }

  return initial
}
