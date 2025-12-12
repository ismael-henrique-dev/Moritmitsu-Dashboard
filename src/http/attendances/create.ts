'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { CreateAttendanceRequest, CreateClassResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function createAttendance(
  payload: CreateAttendanceRequest,
  classId: string
) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    await api.post<CreateClassResponse>(
      `attendence/mark/${classId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    revalidatePath('/dashboard/attendances')

    return { message: 'Frequência criada com sucesso.', status: 'success' }
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
