'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { FetchClassesResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function deleteStudentById(id: string) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const { data: response } = await api.delete<FetchClassesResponse>(
      `/students/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    revalidatePath('/dashboard/students')

    return {
      message: 'Aluno deletado com sucesso.',
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
