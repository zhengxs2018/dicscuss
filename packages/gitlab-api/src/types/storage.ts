export interface StateStore {
  get(name: string): string | null
  set(name: string, value: string): void
  remove(name: string): string | null
  getAllKeys(): string[]
  clear(): void
}
