import type { StateStore } from '../types'

export class TokenManager {
  constructor(private store: StateStore) {}

  get(): string | null {
    return this.store.get('access_token')
  }

  isValid(): boolean {
    return this.get() != null
  }

  restore(token: string): void {
    this.store.clear()
    this.store.set('access_token', token)
  }
}
