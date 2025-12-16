'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { EnrolledStudentsResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'

export async function fetchEnrolledStudents(classId: string, query: string) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const { data: response } = await api.get<EnrolledStudentsResponse>(
      `/students/enrolled/${classId}`,
      {
        params: { search: query },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return {
      message: 'Alunos enturmados carregados com sucesso.',
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
