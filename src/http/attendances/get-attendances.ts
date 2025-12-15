'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { SessionResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'

export async function fetchAttendances(
  currentPage: number,
  classId: string,
  instructorId: string,
  date: string
) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const { data: response } = await api.get<SessionResponse>(
      `/attendence/get`,
      {
        params: {
          currentPage,
          classId,
          instructorId,
          date,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return {
      message: 'Alunos carregados com sucesso.',
      status: 'success',
      data: response,
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
