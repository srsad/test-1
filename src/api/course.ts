import type { AxiosResponse } from 'axios'

import apiClient from '@/apiClient'
import type { CurrencyData } from '@/types/course'

export default {
  getCourse(): Promise<AxiosResponse<CurrencyData>> {
    return apiClient.get('https://www.cbr-xml-daily.ru/daily_json.js')
  },
}
