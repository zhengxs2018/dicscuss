import type { AxiosInstance } from 'axios'
import type { Gitlab } from '../types'

export type RestOptions = {
  client: AxiosInstance
  endpoint: string
}

export class Rest<Resource = any> {
  client: AxiosInstance
  endpoint: string

  constructor(public name: string, options: RestOptions) {
    this.client = options.client
    this.endpoint = `${options.endpoint}/${name}`
  }

  async index(params?: Gitlab.Filter) {
    const response = await this.client.get<Resource[]>(this.endpoint, {
      params,
    })

    const items = response.data
    const total = Number(response.headers['x-total'])

    return {
      items,
      total,
    }
  }

  async show(id: Gitlab.ID): Promise<Resource> {
    const response = await this.client.get(`${this.endpoint}/${id}`)
    return response.data
  }

  async create(payload: any) {
    return this.client.post(this.endpoint, payload)
  }

  async update(id: Gitlab.ID, data: any) {
    return this.client.put(`${this.endpoint}/${id}`, data)
  }

  async remove(id: Gitlab.ID) {
    return this.client.delete(`${this.endpoint}/${id}`)
  }
}
