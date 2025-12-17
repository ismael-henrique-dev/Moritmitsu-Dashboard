'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { CreateClassFormData } from '@/validators/create-class'
import { CreateClassResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

export async function createClass(formData: CreateClassFormData) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const schedule = formData.schedules

    const newClass = {
      name: formData.name,
      maxAge: formData.maxAge,
      minAge: formData.minAge,
      instructor_id: formData.instructor,
      schedule,
    }

    console.log(newClass)

    const response = await api.post<CreateClassResponse>(
      '/classes/create',
      newClass,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    revalidatePath('/dashboard/classes')

    return { message: 'Turma criada com sucesso.', status: 'success' }
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)
    console.log(error)

    switch (statusCode) {
      case 409:
        if (error instanceof AxiosError) {
          const message = error.response?.data.message
          return { message: message, status: 'error' }
        }

      case 500:
        return { message: 'Erro interno no servidor.', status: 'error' }
      default:
        return { message: 'Erro desconhecido.', status: 'error' }
    }
  }
}
