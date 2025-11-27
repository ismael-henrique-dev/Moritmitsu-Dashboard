'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { FetchStudentsResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'

export async function fetchStudents(
  query: string,
  belt: string,
  classId: string,
  currentPage: number,
  grade?: number
) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const { data: response } = await api.get<FetchStudentsResponse>(
      '/students',
      {
        params: {
          search: query,
          belt,
          classId,
          currentPage,
          ...(grade !== undefined && { grade }),
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    api.interceptors.request.use((config) => {
      console.log('➡️ [AXIOS REQUEST]', {
        url: config.url,
        method: config.method,
        params: config.params,
        body: config.data,
        headers: config.headers,
      })
      return config
    })

    return {
      message: 'Alunos carregados com sucesso.',
      status: 'success',
      data: response.result,
    }
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)
    console.log(error)

    switch (statusCode) {
      case 401:
        return { message: 'Email ou senha incorretos.', status: 'error' }
      case 500:
        return { message: 'Erro interno no servidor.', status: 'error' }
      default:
        return { message: 'Erro desconhecido.', status: 'error' }
    }
  }
}
