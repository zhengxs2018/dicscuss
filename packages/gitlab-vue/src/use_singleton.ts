import { provide, inject, getCurrentInstance } from 'vue'

export const getSingleton = <T>(key: string | symbol): T => {
  const resolve = () => {
    const instance = getCurrentInstance()

    // @ts-ignore
    return instance.provides ? instance.provides[key] : undefined
  }
  return inject(key, resolve, true)
}

export const useSingleton = <T>(key: string | symbol, factory: () => T) => {
  let instance = getSingleton<T>(key)
  if (instance) return instance

  instance = factory()

  provide(key, instance)

  return instance
}
