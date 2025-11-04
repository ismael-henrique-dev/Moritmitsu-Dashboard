'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { CreateClassFormData } from '@/validators/create-class'
import { CreateClassResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function createClass(formData: CreateClassFormData) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const newClass = {
      name: formData.name,
      maxAge: formData.maxAge,
      minAge: formData.minAge,
      schedule: `${formData.schedules.map(
        (schedule) => schedule.dayOfWeek
      )} às ${formData.schedules.map((schedule) => schedule.time)}`,
    }

    await api.post<CreateClassResponse>('/classes/create', newClass, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    revalidatePath('/dashboard/classes')

    return { message: 'Turma criada com sucesso.', status: 'success' }
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
