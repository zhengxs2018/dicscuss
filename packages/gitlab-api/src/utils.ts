/** @internal */
export function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ ((Math.random() * 16) >> (c / 4))).toString(16),
  )
}

/** @internal */
export const random = () => uuidv4().replace(/-/g, '')

/** @internal */
export const noop = () => void 0

/** @internal */
export const asyncNever = new Promise<never>(noop)

/** @internal */
export const singleton = <U = any, T = any>(factory: (options: U) => T) => {
  let instance: T | undefined

  function initial(options: U) {
    if (instance) return instance
    instance = factory(options)
    return instance
  }

  initial.get = (): T => {
    if (instance) return instance

    throw new Error('请先初始化')
  }

  return initial
}
