/* eslint-disable import/no-extraneous-dependencies */
import { proxy } from 'ajax-hook'

proxy({
  onResponse: (response, handler) => {
    response.headers['x-total'] = 4
    handler.next(response)
  },
})
