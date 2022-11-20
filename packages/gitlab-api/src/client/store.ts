import type { StateStore } from '../types'

export class WebStorageStateStore implements StateStore {
  #prefix: string
  #store: Storage

  constructor({ prefix = 'gitlab', store = window.localStorage } = {}) {
    this.#store = store
    this.#prefix = prefix
  }

  key(name: string) {
    return `${this.#prefix}.${name}`
  }

  get(name: string): string | null {
    return this.#store.getItem(this.key(name))
  }

  set(name: string, value: string): void {
    this.#store.setItem(this.key(name), value)
  }

  remove(name: string): string | null {
    const key = this.key(name)
    const item = this.#store.getItem(key)

    this.#store.removeItem(key)

    return item
  }

  getAllKeys(): string[] {
    const prefix = this.#prefix
    const store = this.#store

    const keys: string[] = []
    const size = store.length

    for (let index = 0; index < size; index++) {
      const key = store.key(index)

      if (key && key.indexOf(prefix) === 0) {
        keys.push(key.slice(prefix.length))
      }
    }

    return keys
  }

  clear() {
    const prefix = this.#prefix
    const store = this.#store
    const size = store.length

    for (let index = 0; index < size; index++) {
      const key = store.key(index)

      if (key && key.indexOf(prefix) === 0) {
        store.removeItem(key)
      }
    }
  }
}
