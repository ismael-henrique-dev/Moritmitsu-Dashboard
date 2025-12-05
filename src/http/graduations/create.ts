'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { CreateClassResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { CreateGraduationFormData } from '@/validators/create-graduation'

export async function createGraduation(
  formData: CreateGraduationFormData,
  studentId: string
) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const { date, grade, ...rest } = formData

    const newGraduation = {
      ...rest,
      grade: Number(grade),
      graduation_date: date,
    }

    console.log(newGraduation)

    console.log('ID enviado:', studentId)
    console.log('URL:', `/graduations/create/${studentId}`)

    await api.post<CreateClassResponse>(
      `/graduations/create/${studentId}`,
      newGraduation,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    revalidatePath(`/dashboard/students/${studentId}/details`)

    return { message: 'Graduação realizada com sucesso.', status: 'success' }
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
